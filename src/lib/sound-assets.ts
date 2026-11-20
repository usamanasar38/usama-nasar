/**
 * Every soundcn asset the site uses, in one module so the base64 audio becomes its own
 * chunk. Imported dynamically by SoundProvider on the first pointer or key press.
 */
export { playSound } from "@/lib/sound-engine";

export { clickSoftSound } from "@/lib/sounds/click-soft";

export { close001Sound } from "@/lib/sounds/close-001";

export { hoverTickSound } from "@/lib/sounds/hover-tick";

export { open001Sound } from "@/lib/sounds/open-001";

export { successChimeSound } from "@/lib/sounds/success-chime";

export { switchOffSound } from "@/lib/sounds/switch-off";

export { switchOnSound } from "@/lib/sounds/switch-on";

export { tick001Sound } from "@/lib/sounds/tick-001";
