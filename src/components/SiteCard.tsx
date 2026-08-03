import React, { useState } from "react";
import { Star, ExternalLink, Copy, Check } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";
import { Site } from "../data";

interface SiteCardProps {
  site: Site;
  key?: string | number;
  onVisit?: (site: Site) => void;
}

export default function SiteCard({ site, onVisit }: SiteCardProps) {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(site.url);

  let domain = "";
  try {
    domain = new URL(site.url).hostname.replace(/^www\./, "");
  } catch (e) {
    domain = site.url;
  }

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(site.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const statusColors = {
    trusted: "text-accent border-accent bg-accent/5",
    new: "text-success border-success bg-success/5",
    ok: "text-warning border-warning bg-warning/5",
    offline: "text-danger border-danger bg-danger/5",
  };

  const badgeClass = site.status ? statusColors[site.status] : "text-accent border-accent bg-accent/5";

  // Helper to generate dynamic initials and gradient logos for a brand-like appearance
  const getLogoDetails = (name: string) => {
    const clean = name.replace(/Reading|Portal/g, "").trim();
    const words = clean.split(/[\s.\-_]+/);
    let initials = "";
    if (words.length >= 2 && words[0] && words[1]) {
      initials = (words[0][0] + words[1][0]).toUpperCase();
    } else if (clean.length >= 2) {
      initials = clean.slice(0, 2).toUpperCase();
    } else {
      initials = clean.toUpperCase() || "??";
    }

    // Generate stable hash for gradient choice
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const gradients = [
      "from-[#8b5cf6] to-[#6366f1] shadow-[#8b5cf6]/20",
      "from-[#ec4899] to-[#d946ef] shadow-[#ec4899]/20",
      "from-[#38bdf8] to-[#1d4ed8] shadow-[#38bdf8]/20",
      "from-[#10b981] to-[#047857] shadow-[#10b981]/20",
      "from-[#fbbf24] to-[#f59e0b] shadow-[#fbbf24]/20",
      "from-[#f43f5e] to-[#be123c] shadow-[#f43f5e]/20",
      "from-[#a855f7] to-[#701a75] shadow-[#a855f7]/20"
    ];
    const gradient = gradients[Math.abs(hash) % gradients.length];
    return { initials, gradient };
  };

  const { initials, gradient } = getLogoDetails(site.name);

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noreferrer"
      id={`site-${site.name.toLowerCase().replace(/\s+/g, "-")}`}
      onClick={() => onVisit?.(site)}
      className="lfss-card group relative flex aspect-[1.5] flex-col justify-between p-3 cursor-pointer overflow-hidden"
    >
      {/* Background Radial Glow on Hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--accent) 15%, transparent), transparent 65%)`,
        }}
      />

      {/* Top row: Status Badge and Star Button */}
      <div className="relative z-10 flex items-center justify-between">
        {site.status ? (
          <span
            className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider leading-none ${badgeClass}`}
          >
            {site.status}
          </span>
        ) : (
          <span className="opacity-0">-</span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(site);
          }}
          className={`grid h-7 w-7 place-items-center rounded-lg transition-all duration-200 hover:bg-bg-elev hover:text-accent hover:scale-125 hover:rotate-12 active:scale-90 focus:outline-none cursor-pointer ${
            isFav
              ? "text-accent opacity-100 scale-110"
              : "text-fg-muted opacity-40 group-hover:opacity-100"
          }`}
          title={isFav ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Star size={13} fill={isFav ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Middle section: Centered Brand Logo matching screenshot layout */}
      <div className="relative z-10 my-auto flex flex-1 flex-col items-center justify-center py-1.5 px-1.5">
        {site.logoUrl && !imageError ? (
          <div className="flex h-10 w-full items-center justify-center select-none transition-transform duration-300 group-hover:scale-110">
            <img
              src={site.logoUrl}
              alt={site.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="max-h-[36px] max-w-[85%] object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center select-none transition-transform duration-300 group-hover:scale-110">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-white font-black text-[10px] tracking-tighter shadow-md select-none border border-white/15 mb-1 ${gradient}`}
            >
              {initials}
            </div>
            <span className="text-[11px] font-bold tracking-tight text-fg group-hover:text-accent transition-colors truncate max-w-[110px]">
              {site.name}
            </span>
          </div>
        )}
      </div>

      {/* Bottom row: Link domain and Copy Button */}
      <div className="relative z-10 flex items-center justify-between pt-1 border-t border-border-custom/30">
        <div className="flex items-center gap-1 text-[9px] text-fg-muted truncate max-w-[80%]">
          <ExternalLink size={9} className="shrink-0" />
          <span className="truncate tracking-wide font-mono leading-none">{domain}</span>
        </div>

        <button
          onClick={handleCopy}
          className="grid h-5 w-5 place-items-center rounded bg-bg-elev/50 text-fg-muted hover:text-fg hover:bg-bg-elev/90 hover:scale-115 active:scale-90 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
          title="Copy URL to Clipboard"
        >
          {copied ? (
            <Check size={9} className="text-success" />
          ) : (
            <Copy size={9} />
          )}
        </button>
      </div>
    </a >
  );
}
