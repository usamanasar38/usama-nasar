import {
  BriefcaseIcon,
  CodeIcon,
  EnvelopeSimpleIcon,
  FileTextIcon,
  GithubLogoIcon,
  GlobeSimpleIcon,
  HourglassSimpleIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  PhoneIcon,
  StackIcon,
  ClockIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

/** Name → Phosphor icon for keys used in content (docs/design/02-foundations.md#icons). */
export const ICONS = {
  company: BriefcaseIcon,
  email: EnvelopeSimpleIcon,
  experience: HourglassSimpleIcon,
  focus: StackIcon,
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
  location: MapPinIcon,
  phone: PhoneIcon,
  resume: FileTextIcon,
  role: CodeIcon,
  time: ClockIcon,
  website: GlobeSimpleIcon,
  x: XLogoIcon,
} satisfies Record<string, Icon>;

export type IconName = keyof typeof ICONS;
