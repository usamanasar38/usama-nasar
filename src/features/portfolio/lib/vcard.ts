import { SITE_INFO } from "@/config/site"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"
import { decodeB64 } from "@/features/portfolio/lib/format"

/**
 * vCard 4.0 for a "Save contact" action (/vcard route, text/vcard).
 * Built on the server; the email and phone are only decoded here.
 */
export function buildVCard() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:4.0",
    `N:${USER.lastName};${USER.firstName};;;`,
    `FN:${USER.displayName}`,
    `TITLE:${USER.jobTitle}`,
    `EMAIL;TYPE=work:${decodeB64(USER.emailB64)}`,
    `TEL;TYPE=cell:${decodeB64(USER.phoneNumberB64)}`,
    `ADR;TYPE=home:;;;Mandi Bahauddin;Punjab;;Pakistan`,
    `URL:${SITE_INFO.url}`,
    ...SOCIAL_LINKS.map((s) => `X-SOCIALPROFILE;TYPE=${s.name}:${s.href}`),
    `NOTE:${USER.bio}`,
    "END:VCARD",
  ]
  return lines.join("\r\n")
}
