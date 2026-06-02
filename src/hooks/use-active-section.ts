import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibilityMap = new Map<string, number>();

    const handleIntersection =
      (id: string) => (entries: IntersectionObserverEntry[]) => {
        for (const entry of entries) {
          visibilityMap.set(id, entry.intersectionRatio);
        }

        let maxRatio = 0;
        let mostVisible = '';
        for (const [sectionId, ratio] of visibilityMap) {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisible = sectionId;
          }
        }

        if (mostVisible) {
          setActiveId(mostVisible);
        }
      };

    for (const id of sectionIds) {
      const el = document.querySelector(`#${id}`);
      if (!el) {
        continue;
      }

      const observer = new IntersectionObserver(handleIntersection(id), {
        rootMargin: '-80px 0px -40% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      });

      observer.observe(el);
      observers.push(observer);
    }

    return () => {
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  }, [sectionIds]);

  return activeId;
}
