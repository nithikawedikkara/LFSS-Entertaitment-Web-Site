import { useEffect, useState, useRef } from "react";
import { Search, CornerDownLeft, Star, ExternalLink, Globe } from "lucide-react";
import { allSites, FlatSite } from "../data";
import { AnimatePresence, motion } from "motion/react";
import { useFavorites } from "../hooks/useFavorites";

const SiteResultLogo = ({ site, isSelected }: { site: FlatSite; isSelected: boolean }) => {
  const [imageError, setImageError] = useState(false);
  if (site.logoUrl && !imageError) {
    return (
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/5 p-0.5 border border-white/10 overflow-hidden">
        <img
          src={site.logoUrl}
          alt={site.name}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="h-full w-full object-contain rounded"
        />
      </div>
    );
  }
  return <Globe size={16} className={`shrink-0 ${isSelected ? 'text-accent' : 'text-fg-muted'}`} />;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Toggle palette on Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Listen for custom trigger event
  useEffect(() => {
    const openPalette = () => {
      setOpen(true);
    };
    window.addEventListener("lfss-open-search", openPalette);
    return () => window.removeEventListener("lfss-open-search", openPalette);
  }, []);

  // Focus input when palette opens
  useEffect(() => {
    if (open) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [open]);

  // Filter sites based on search
  const filteredSites = allSites.filter((site) => {
    const query = search.toLowerCase().trim();
    if (!query) return true;
    
    return (
      site.name.toLowerCase().includes(query) ||
      site.categoryName.toLowerCase().includes(query) ||
      (site.description && site.description.toLowerCase().includes(query)) ||
      (site.status && site.status.toLowerCase().includes(query)) ||
      site.url.toLowerCase().includes(query)
    );
  });

  // Handle keyboard navigation
  useEffect(() => {
    if (!open || filteredSites.length === 0) return;

    const handleNavigation = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredSites.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredSites.length) % filteredSites.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const site = filteredSites[selectedIndex];
        if (site) {
          window.open(site.url, "_blank", "noopener,noreferrer");
          setOpen(false);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleNavigation);
    return () => window.removeEventListener("keydown", handleNavigation);
  }, [open, filteredSites, selectedIndex]);

  // Keep active item scrolled into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector("[data-active='true']");
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  // Group filtered items by category
  const groupedSites: { [key: string]: FlatSite[] } = {};
  filteredSites.forEach((site) => {
    if (!groupedSites[site.categoryName]) {
      groupedSites[site.categoryName] = [];
    }
    groupedSites[site.categoryName].push(site);
  });

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-bg/80 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          {/* Dialog Body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            id="search-palette-modal"
            className="relative z-10 w-full max-w-xl mx-4 overflow-hidden rounded-2xl border border-border-strong bg-bg-elev shadow-2xl"
            style={{ boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px var(--accent-glow)" }}
          >
            {/* Header / Search Input */}
            <div className="flex items-center gap-3 border-b border-border-custom px-4 py-3.5">
              <Search size={18} className="text-fg-muted shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search streaming sites, categories, status tags..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                className="flex-1 bg-transparent py-1 text-sm text-fg placeholder-fg-muted outline-none"
              />
              <button
                onClick={() => setOpen(false)}
                className="rounded px-1.5 py-0.5 text-[10px] font-mono border border-border-custom text-fg-muted hover:text-fg hover:border-border-strong"
              >
                ESC
              </button>
            </div>

            {/* Results List */}
            <div
              ref={listRef}
              className="max-h-[50vh] overflow-y-auto p-2"
            >
              {filteredSites.length === 0 ? (
                <div className="py-12 text-center text-sm text-fg-muted">
                  No matching couch potato streaming sites found.
                </div>
              ) : (
                Object.keys(groupedSites).map((categoryName) => (
                  <div key={categoryName} className="mb-3">
                    {/* Category Label */}
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-fg-muted">
                      {categoryName}
                    </div>

                    {/* Site List */}
                    <div className="space-y-0.5">
                      {groupedSites[categoryName].map((site) => {
                        // Calculate global index
                        const globalIndex = filteredSites.findIndex(
                          (item) => item.url === site.url
                        );
                        const isSelected = globalIndex === selectedIndex;
                        const isFav = isFavorite(site.url);

                        let cleanDomain = "";
                        try {
                          cleanDomain = new URL(site.url).hostname.replace(/^www\./, "");
                        } catch (e) {
                          cleanDomain = site.url;
                        }

                        return (
                          <div
                            key={site.url}
                            data-active={isSelected}
                            onClick={() => {
                              window.open(site.url, "_blank", "noopener,noreferrer");
                              setOpen(false);
                            }}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all ${
                              isSelected
                                ? "bg-bg-card-hover border-l-2 border-accent text-fg"
                                : "text-fg-muted hover:text-fg"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <SiteResultLogo site={site} isSelected={isSelected} />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className={`font-semibold ${isSelected ? "text-fg" : "text-fg/80"}`}>
                                    {site.name}
                                  </span>
                                  {site.status && (
                                    <span className="rounded px-1.5 py-0.2 text-[8px] font-extrabold uppercase border border-border-custom/40 text-fg-muted">
                                      {site.status}
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-fg-muted truncate mt-0.5 font-mono">
                                  {cleanDomain} {site.description && `• ${site.description}`}
                                </div>
                              </div>
                            </div>

                            {/* Icons and badges on the right side */}
                            <div className="flex items-center gap-2 shrink-0 pl-2">
                              {isFav && (
                                <Star size={12} className="text-accent" fill="currentColor" />
                              )}
                              {isSelected ? (
                                <div className="flex items-center gap-1 text-[10px] bg-accent/10 border border-accent/20 px-1.5 py-0.5 rounded text-accent font-medium">
                                  <span>GO</span>
                                  <CornerDownLeft size={8} />
                                </div>
                              ) : (
                                <ExternalLink size={12} className="opacity-40" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Helper Footer */}
            <div className="flex items-center justify-between border-t border-border-custom bg-bg/50 px-4 py-2.5 text-[10px] text-fg-muted">
              <div className="flex items-center gap-4">
                <span>
                  <kbd className="rounded bg-bg-elev px-1.5 py-0.5 border border-border-custom font-sans">↑↓</kbd> Navigate
                </span>
                <span>
                  <kbd className="rounded bg-bg-elev px-1.5 py-0.5 border border-border-custom font-sans">Enter</kbd> Open
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>Press</span>
                <kbd className="rounded bg-bg-elev px-1.5 py-0.5 border border-border-custom font-sans">⌘</kbd>
                <span>+</span>
                <kbd className="rounded bg-bg-elev px-1.5 py-0.5 border border-border-custom font-sans">K</kbd>
                <span>to toggle</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
