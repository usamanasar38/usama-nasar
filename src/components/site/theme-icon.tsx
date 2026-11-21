import { useEffect, useId, useRef } from "react";

import { THEME_CHANGE_EVENT } from "@/lib/theme";

const RAYS = [
  [19, 12, 21.5, 12],
  [16.95, 16.95, 18.72, 18.72],
  [12, 19, 12, 21.5],
  [7.05, 16.95, 5.28, 18.72],
  [5, 12, 2.5, 12],
  [7.05, 7.05, 5.28, 5.28],
  [12, 5, 12, 2.5],
  [16.95, 7.05, 18.72, 5.28],
] as const;

const UNSAFE_ID_CHARS = /[^\w-]/gu;

const HALF_TURN = 180;
const FULL_TURN = 360;
const ORBIT_RADIUS = 13;
const SPRING_OMEGA = 8;
const MAX_FRAME_S = 1 / 30;
const REST_ANGLE = 0.05;
const REST_VELOCITY = 0.5;
const FULL_MOON_SHADOW = -14;
const RAY_TURN = -30;
const RAY_MIN_SCALE = 0.5;

const toRadians = (degrees: number) => (degrees * Math.PI) / HALF_TURN;

const smoothstep = (from: number, to: number, value: number) => {
  const progress = Math.min(1, Math.max(0, (value - from) / (to - from)));

  return progress * progress * (3 - 2 * progress);
};

const isDark = () => document.documentElement.classList.contains("dark");

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface SkyParts {
  sun: SVGGElement;
  rays: SVGGElement;
  core: SVGCircleElement;
  moon: SVGGElement;
  shadow: SVGCircleElement;
}

const orbitOffset = (angle: number) => {
  const radians = toRadians(angle);

  return `translate(${ORBIT_RADIUS * Math.sin(radians)}px, ${ORBIT_RADIUS * (1 - Math.cos(radians))}px)`;
};

const drawSky = (parts: SkyParts, angle: number) => {
  const sunHeight = Math.cos(toRadians(angle));
  const moonHeight = -sunHeight;
  const sunset = Math.round((1 - smoothstep(0.2, 0.9, sunHeight)) * 100);
  const rays = smoothstep(0.45, 0.95, sunHeight);
  const fullness = smoothstep(0.3, 0.95, moonHeight);
  const edge = `color-mix(in oklch, var(--sunset) ${sunset}%, var(--sun-edge))`;

  parts.sun.style.transform = orbitOffset(angle);
  parts.moon.style.transform = orbitOffset(angle + HALF_TURN);
  parts.core.style.fill = `color-mix(in oklch, var(--sunset) ${sunset}%, var(--sun))`;
  parts.core.style.stroke = edge;
  parts.rays.style.stroke = edge;
  parts.rays.style.opacity = String(rays);
  parts.rays.style.transform = `translate(12px, 12px) rotate(${(1 - rays) * RAY_TURN}deg) scale(${RAY_MIN_SCALE + (1 - RAY_MIN_SCALE) * rays}) translate(-12px, -12px)`;
  parts.shadow.style.transform = `translateX(${fullness * FULL_MOON_SHADOW}px)`;
};

const createSky = (parts: SkyParts) => {
  let angle = isDark() ? HALF_TURN : 0;
  let velocity = 0;
  let target = angle;
  let origin = angle;
  let frame = 0;
  let last = 0;

  const settle = () => {
    angle = target % FULL_TURN;
    target = angle;
    origin = angle;
    velocity = 0;
    frame = 0;
    drawSky(parts, angle);
  };

  const tick = (now: number) => {
    const step = last === 0 ? 0 : Math.min((now - last) / 1000, MAX_FRAME_S);

    last = now;
    velocity +=
      (SPRING_OMEGA * SPRING_OMEGA * (target - angle) -
        2 * SPRING_OMEGA * velocity) *
      step;
    angle += velocity * step;

    const resting =
      Math.abs(target - angle) < REST_ANGLE &&
      Math.abs(velocity) < REST_VELOCITY;

    if (resting) {
      settle();

      return;
    }

    drawSky(parts, angle);
    frame = requestAnimationFrame(tick);
  };

  const follow = () => {
    const wanted = isDark() ? HALF_TURN : 0;

    if (target % FULL_TURN === wanted) {
      return;
    }

    if (frame === 0) {
      origin = target;
      target += HALF_TURN;
    } else {
      [origin, target] = [target, origin];
    }

    if (prefersReducedMotion()) {
      cancelAnimationFrame(frame);
      settle();

      return;
    }

    if (frame === 0) {
      last = 0;
      frame = requestAnimationFrame(tick);
    }
  };

  drawSky(parts, angle);
  window.addEventListener(THEME_CHANGE_EVENT, follow);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, follow);
    cancelAnimationFrame(frame);
  };
};

/**
 * Sun and moon on one arc for the theme toggle. Switching theme turns the sky: the sun
 * sets on the right, yellowing to orange and drawing in its rays as it nears the horizon,
 * while a crescent moon rises on the left and waxes to full at the top (and the reverse
 * at dawn). One angle drives everything through a critically damped spring: day is 0°,
 * night 180°, the next day 360° (normalised to 0°), so the sky always turns the same way.
 * A theme change mid-flight swaps the spring's target back to where it came from, keeping
 * its velocity, so quick clicks reverse the scene in place.
 *
 * Before hydration, `.theme-icon-*` rules in app.css show the right body for the `.dark`
 * class; after it, inline styles take over. Decorative: the button carries the label.
 */
export const ThemeIcon = () => {
  const maskId = `moon-${useId().replaceAll(UNSAFE_ID_CHARS, "")}`;
  const sun = useRef<SVGGElement>(null);
  const rays = useRef<SVGGElement>(null);
  const core = useRef<SVGCircleElement>(null);
  const moon = useRef<SVGGElement>(null);
  const shadow = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const parts =
      sun.current === null ||
      rays.current === null ||
      core.current === null ||
      moon.current === null ||
      shadow.current === null
        ? undefined
        : {
            core: core.current,
            moon: moon.current,
            rays: rays.current,
            shadow: shadow.current,
            sun: sun.current,
          };

    return parts === undefined ? undefined : createSky(parts);
  }, []);

  return (
    <svg
      aria-hidden
      className="theme-icon"
      fill="none"
      focusable="false"
      height="20"
      viewBox="0 0 24 24"
      width="20"
    >
      <defs>
        <mask id={maskId}>
          <rect className="theme-icon-mask" height="24" width="24" />
          <circle
            className="theme-icon-shadow"
            cx="9.6"
            cy="12"
            r="6.6"
            ref={shadow}
          />
        </mask>
      </defs>
      <g className="theme-icon-moon" ref={moon}>
        <circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask={`url(#${maskId})`}
          r="6"
        />
      </g>
      <g className="theme-icon-sun" ref={sun}>
        <g
          className="theme-icon-rays"
          ref={rays}
          strokeLinecap="round"
          strokeWidth="1.75"
        >
          {RAYS.map(([x1, y1, x2, y2]) => (
            <line key={`${x2}-${y2}`} x1={x1} x2={x2} y1={y1} y2={y2} />
          ))}
        </g>
        <circle
          className="theme-icon-core"
          cx="12"
          cy="12"
          r="4.25"
          ref={core}
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
};
