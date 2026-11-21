import { useEffect, useId, useRef } from "react";
import type { CSSProperties } from "react";

import { TILE_CUT_PATH } from "@/components/brand/logo";
import { useSounds } from "@/lib/sound";

const LAYERS = 8;
const SCALE = 2.2;
const ORIGIN_X = 240;
const ORIGIN_Y = 70.6;
const ISOMETRIC = "matrix(0.866 0.5 -0.866 0.5 0 0)";
const TILE = 64;
const TILE_RADIUS = 14;
const CUT_WIDTH = 5.5;
const EDGE_OUTER = 6.6;
const EDGE_STROKE = 6.1;
const GLOW_RADIUS = 34;
const GLOW_REST = 32;
const GLOW_MIN = -8;
const GLOW_MAX = 72;
const GLOW_FOLLOW = 0.25;
const GLOW_SETTLED = 0.05;
const GUIDES = "M-200 0H264M-200 64H264M0 -200V264M64 -200V264";

const clampGlow = (value: number) =>
  Math.min(GLOW_MAX, Math.max(GLOW_MIN, value));

const canTrackPointer = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface GlowParts {
  figure: HTMLElement;
  face: SVGRectElement;
  glow: SVGRadialGradientElement;
}

const trackGlow = ({ figure, face, glow }: GlowParts) => {
  let visible = false;
  let frame = 0;
  let current = { x: GLOW_REST, y: GLOW_REST };
  let wanted = current;

  const step = () => {
    current = {
      x: current.x + (wanted.x - current.x) * GLOW_FOLLOW,
      y: current.y + (wanted.y - current.y) * GLOW_FOLLOW,
    };
    glow.setAttribute("cx", current.x.toFixed(2));
    glow.setAttribute("cy", current.y.toFixed(2));

    const moving =
      Math.abs(wanted.x - current.x) > GLOW_SETTLED ||
      Math.abs(wanted.y - current.y) > GLOW_SETTLED;

    frame = moving ? requestAnimationFrame(step) : 0;
  };

  const onMove = (event: PointerEvent) => {
    const matrix = face.getScreenCTM();

    if (!visible || matrix === null) {
      return;
    }

    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(
      matrix.inverse()
    );

    wanted = { x: clampGlow(point.x), y: clampGlow(point.y) };

    if (frame === 0) {
      frame = requestAnimationFrame(step);
    }
  };

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? false;
  });

  observer.observe(figure);
  window.addEventListener("pointermove", onMove, { passive: true });

  return () => {
    observer.disconnect();
    window.removeEventListener("pointermove", onMove);
    cancelAnimationFrame(frame);
  };
};

const Layer = ({
  index,
  ids,
  faceRef,
}: {
  index: number;
  ids: { cut: string; edge: string; hatch: string; glow: string };
  faceRef?: React.Ref<SVGRectElement>;
}) => {
  const top = index === LAYERS - 1;
  const style: CSSProperties & Record<"--iso-i", number> = { "--iso-i": index };

  return (
    <g className="iso-layer" style={style}>
      <g transform={`scale(${SCALE}) ${ISOMETRIC}`}>
        <rect
          className="fill-background"
          height={TILE}
          mask={`url(#${ids.cut})`}
          rx={TILE_RADIUS}
          stroke="var(--iso-line)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          width={TILE}
        />
        {top ? (
          <rect
            fill={`url(#${ids.hatch})`}
            height={TILE}
            mask={`url(#${ids.cut})`}
            rx={TILE_RADIUS}
            width={TILE}
          />
        ) : null}
        <path
          d={TILE_CUT_PATH}
          mask={`url(#${ids.edge})`}
          stroke="var(--iso-line)"
          strokeWidth={EDGE_STROKE}
        />
        {top ? (
          <>
            <rect
              height={TILE}
              mask={`url(#${ids.cut})`}
              ref={faceRef}
              rx={TILE_RADIUS}
              stroke={`url(#${ids.glow})`}
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              width={TILE}
            />
            <path
              d={TILE_CUT_PATH}
              mask={`url(#${ids.edge})`}
              stroke={`url(#${ids.glow})`}
              strokeWidth={EDGE_OUTER}
            />
          </>
        ) : null}
      </g>
    </g>
  );
};

const LAYER_INDEXES = Array.from({ length: LAYERS }, (_, index) => index);

/**
 * The tile mark as an isometric object, above the intro (after chanhdai.com's profile
 * figure). Eight stacked plates of the brand tile, drawn from the brand paths under an
 * isometric transform, with the wave cut through every plate. Press it (mouse, touch or
 * keyboard) and the plates squash together with a click; on hover-capable devices a soft
 * glow on the top edges follows the pointer while the figure is on screen.
 */
export const BrandFigure = () => {
  const id = useId().replaceAll(/[^\w-]/gu, "");

  const ids = {
    cut: `iso-cut-${id}`,
    edge: `iso-edge-${id}`,
    glow: `iso-glow-${id}`,
    hatch: `iso-hatch-${id}`,
  };

  const figure = useRef<HTMLElement>(null);
  const face = useRef<SVGRectElement>(null);
  const glow = useRef<SVGRadialGradientElement>(null);
  const { play } = useSounds();

  useEffect(() => {
    const parts =
      figure.current === null || face.current === null || glow.current === null
        ? undefined
        : { face: face.current, figure: figure.current, glow: glow.current };

    return parts === undefined || !canTrackPointer()
      ? undefined
      : trackGlow(parts);
  }, []);

  return (
    <figure className="pt-10" ref={figure}>
      <button
        aria-label="Press the logo"
        className="iso-press block w-full rounded-xl"
        onClick={() => {
          play("press");
        }}
        type="button"
      >
        <svg
          aria-hidden
          className="iso-mark h-auto w-full"
          fill="none"
          focusable="false"
          viewBox="0 0 480 240"
        >
          <defs>
            <mask id={ids.cut}>
              <rect
                className="iso-mask-area"
                height="84"
                width="84"
                x="-10"
                y="-10"
              />
              <path
                className="iso-mask-hole"
                d={TILE_CUT_PATH}
                strokeWidth={CUT_WIDTH}
              />
            </mask>
            <mask id={ids.edge}>
              <path
                className="iso-mask-line"
                d={TILE_CUT_PATH}
                strokeWidth={EDGE_OUTER}
              />
              <path
                className="iso-mask-hole"
                d={TILE_CUT_PATH}
                strokeWidth={CUT_WIDTH}
              />
            </mask>
            <pattern
              height="3"
              id={ids.hatch}
              patternUnits="userSpaceOnUse"
              width="3"
            >
              <path
                d="M-1 1l2-2M0 3l3-3M2 4l2-2"
                stroke="var(--iso-soft)"
                strokeWidth="0.35"
              />
            </pattern>
            <radialGradient
              cx={GLOW_REST}
              cy={GLOW_REST}
              gradientUnits="userSpaceOnUse"
              id={ids.glow}
              r={GLOW_RADIUS}
              ref={glow}
            >
              <stop className="iso-glow" />
              <stop className="iso-glow" offset="1" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g transform={`translate(${ORIGIN_X} ${ORIGIN_Y})`}>
            <g
              stroke="var(--iso-soft)"
              strokeDasharray="2 1.2"
              strokeWidth="0.4"
              transform={`scale(${SCALE}) ${ISOMETRIC}`}
            >
              <path d={GUIDES} />
            </g>
            {LAYER_INDEXES.map((index) => (
              <Layer
                faceRef={index === LAYERS - 1 ? face : undefined}
                ids={ids}
                index={index}
                key={index}
              />
            ))}
          </g>
        </svg>
      </button>
    </figure>
  );
};
