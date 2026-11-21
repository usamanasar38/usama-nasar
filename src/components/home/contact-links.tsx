import { ArrowUpRightIcon, SpeakerHighIcon, SpeakerSlashIcon } from "@phosphor-icons/react";
import { useState } from "react";

import { EXTERNAL, NewTabNote } from "@/components/site/external-note";
import { IconSwap } from "@/components/site/icon-swap";
import { contactLinks } from "@/content/site";
import { useSounds } from "@/lib/sound";

const SoundPill = () => {
  const { enabled, toggle } = useSounds();
  const [interacted, setInteracted] = useState(false);
  return (
    <button
      aria-pressed={enabled}
      className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full border px-3.5 font-mono text-micro text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground"
      onClick={() => {
        setInteracted(true);
        toggle();
      }}
      type="button"
    >
      <IconSwap animate={interacted} swapKey={enabled ? "on" : "off"}>
        {enabled ? (
          <SpeakerHighIcon aria-hidden className="size-4" />
        ) : (
          <SpeakerSlashIcon aria-hidden className="size-4" />
        )}
      </IconSwap>
      sound {enabled ? "on" : "off"}
    </button>
  );
};

export const Contact = () => {
  const { note, play } = useSounds();
  return (
    <section aria-labelledby="h-contact" className="mt-24" id="contact">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-h1" id="h-contact">
            Say hi.
          </h2>
          <p className="text-muted-foreground">
            Hiring for a senior frontend role, or need help with a migration or Core Web Vitals? Email is the fastest way to reach me.
          </p>
        </div>
        <SoundPill />
      </div>
      <ul className="flex flex-col">
        {contactLinks.map((link, index) => (
          <li key={link.href}>
            <a
              className="group -mx-3 flex items-center gap-4 rounded-xl px-3 py-3 md:gap-6"
              href={link.href}
              onClick={() => play("click")}
              onFocus={() => note(index)}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") {
                  note(index);
                }
              }}
              {...(link.external ? EXTERNAL : {})}
            >
              <span aria-hidden className="w-6 shrink-0 font-mono text-caption text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-say decoration-foreground/0 underline-offset-[6px] transition-[text-decoration-color] duration-150 group-hover:underline group-hover:decoration-foreground/40 group-focus-visible:underline">
                {link.label}
              </span>
              <span className="ml-auto hidden font-mono text-caption text-muted-foreground md:block">
                {link.hint}
              </span>
              <ArrowUpRightIcon
                aria-hidden
                className="ml-auto size-[22px] shrink-0 text-muted-foreground transition-transform duration-200 ease-out-quint group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground motion-reduce:transition-none md:ml-0"
              />
              {link.external ? <NewTabNote /> : null}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
