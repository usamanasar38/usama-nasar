import { DATA } from "@/data/resume";
import Link from "next/link";
import GitHub from "../icons/github";
import LinkedIn from "../icons/linkedin";
import NavLinks from "../nav-links";

const Header = () => {
  
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          <Link href="/">{DATA.name}</Link>
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
          {DATA.role}
        </h2>
        <p className="mt-4 max-w-xs leading-normal">
          {DATA.description}
        </p>
        <nav className="nav hidden lg:block" aria-label="In-page jump links">
          <ul className="mt-16 w-max">
            <NavLinks />
          </ul>
        </nav>
      </div>
      <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
        <li className="mr-5 shrink-0 text-xs">
          <a
            className="block hover:text-slate-200"
            href={DATA.contact.social.GitHub.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${DATA.contact.social.GitHub.name} (opens in a new tab)`}
            title={DATA.contact.social.GitHub.name}
          >
            <span className="sr-only">{DATA.contact.social.GitHub.name}</span>
            <GitHub className="h-6 w-6" />
          </a>
        </li>
        <li className="mr-5 shrink-0 text-xs">
          <a
            className="block hover:text-slate-200"
            href={DATA.contact.social.LinkedIn.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${DATA.contact.social.LinkedIn.name} (opens in a new tab)`}
            title={DATA.contact.social.LinkedIn.name}
          >
            <span className="sr-only">{DATA.contact.social.LinkedIn.name}</span>
            <LinkedIn className="h-6 w-6" />
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
