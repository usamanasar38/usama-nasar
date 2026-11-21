import { useEffect, useRef, useState } from "react";

import { useSounds } from "@/lib/sound";

const COPIED_MS = 1800;

/**
 * Copies text to the clipboard, plays `success` and holds `copied` true for
 * 1.8s so the caller can swap its icon to a tick. `copy` resolves false when
 * the clipboard is unavailable, so the caller can fall back.
 */
export const useCopy = () => {
  const { play } = useSounds();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(
    () => () => {
      clearTimeout(timer.current);
    },
    []
  );

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return false;
    }

    play("success");
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCopied(false);
    }, COPIED_MS);

    return true;
  };

  return { copied, copy };
};
