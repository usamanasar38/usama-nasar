"use client";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const NavLinks = () => {
    // Used to trigger the side effect responsible of updating the path state  
	const refreshCurrentPath = useSearchParams();
  const [activeLink, setActiveLink] = useState<string>(DATA.navbar[0].href);

  useEffect(() => {
    setActiveLink(decodeURIComponent(window.location.hash))
  }, [refreshCurrentPath]);

  return DATA.navbar.map((item, index) => (
    <li key={index}>
      <Link className={cn("group flex items-center py-3", activeLink === item.href && 'active')} href={item.href}>
        <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
        <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
          {item.label}
        </span>
      </Link>
    </li>
  ));
};

export default NavLinks;
