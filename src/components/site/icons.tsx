import {
  BriefcaseIcon,
  CodeIcon,
  EnvelopeSimpleIcon,
  FileTextIcon,
  GithubLogoIcon,
  GlobeSimpleIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  StackIcon,
  ClockIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

/** Name → Phosphor icon for keys used in content (docs/design/02-foundations.md#icons). */
export const ICONS = {
  company: BriefcaseIcon,
  email: EnvelopeSimpleIcon,
  experience: ClockIcon,
  focus: StackIcon,
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
  location: MapPinIcon,
  resume: FileTextIcon,
  role: CodeIcon,
  website: GlobeSimpleIcon,
  x: XLogoIcon,
} satisfies Record<string, Icon>;

export type IconName = keyof typeof ICONS;
