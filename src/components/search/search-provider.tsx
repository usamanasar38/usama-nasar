import {
  createContext,
  lazy,
  Suspense,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import { useSearchHotkey } from "@/hooks/use-search-hotkey";
import { useSounds } from "@/lib/sound";

const loadDialog = async () =>
  await import("@/components/search/search-dialog");
const SearchDialog = lazy(loadDialog);

/** Warms the lazy dialog chunk (cmdk + index) on hover/focus of any search trigger. */
const prefetch = () => {
  loadDialog().catch(() => {
    // A failed prefetch is retried when the dialog actually opens.
  });
};

interface SearchContextValue {
  openSearch: () => void;
  prefetchProps: { onPointerEnter: () => void; onFocus: () => void };
}

const SearchContext = createContext<SearchContextValue | null>(null);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { play } = useSounds();

  const openSearch = useCallback(() => {
    if (!open) {
      play("open");
    }

    setMounted(true);
    setOpen(true);
  }, [open, play]);

  useSearchHotkey(openSearch);

  const value = useMemo(
    () => ({
      openSearch,
      prefetchProps: { onFocus: prefetch, onPointerEnter: prefetch },
    }),
    [openSearch]
  );

  return (
    <SearchContext value={value}>
      {children}
      {mounted ? (
        <Suspense fallback={null}>
          <SearchDialog
            onOpenChange={(next) => {
              if (!next) {
                play("collapse");
              }

              setOpen(next);
            }}
            open={open}
          />
        </Suspense>
      ) : null}
    </SearchContext>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch() must be used inside <SearchProvider>.");
  }

  return context;
};
