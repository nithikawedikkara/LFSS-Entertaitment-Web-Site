import { useState, useEffect, useRef } from "react";
import { Search, Palette, Terminal, Moon, Compass, Sun, Eye, ChevronDown, Check } from "lucide-react";
import { useTheme, themes } from "../hooks/useTheme";

export const regions = [
  { code: "US", label: "United States", flag: "🇺🇸" },
  { code: "GB", label: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", label: "Canada", flag: "🇨🇦" },
  { code: "DE", label: "Germany", flag: "🇩🇪" },
  { code: "FR", label: "France", flag: "🇫🇷" },
  { code: "INT", label: "Global", flag: "🌏" }
];

interface NavbarProps {
  region: string;
  setRegion: (region: string) => void;
}

export default function Navbar({ region, setRegion }: NavbarProps) {
  const { theme, changeTheme } = useTheme();
  const [themeOpen, setThemeOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const regionDropdownRef = useRef<HTMLDivElement>(null);

  // Find active region details
  const activeRegion = regions.find((r) => r.code === region) || regions[0];

  // Trigger command palette open event
  const triggerSearch = () => {
    window.dispatchEvent(new Event("lfss-open-search"));
  };

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
      if (regionDropdownRef.current && !regionDropdownRef.current.contains(e.target as Node)) {
        setRegionOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Theme labels and visual colors
  const themeDetails: { [key: string]: { label: string; color: string; icon: any } } = {
    "purple-dark": { label: "Vivid Purple", color: "bg-[#8b5cf6]", icon: Moon },
    midnight: { label: "Deep Ocean", color: "bg-[#38bdf8]", icon: Compass },
    synthwave: { label: "Synthwave", color: "bg-[#ec4899]", icon: Eye },
    paper: { label: "Warm Paper", color: "bg-[#18181b]", icon: Sun },
    terminal: { label: "Terminal", color: "bg-[#22c55e]", icon: Terminal },
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-border-custom/30 bg-bg/90 backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 md:px-8">
        
        {/* Left Side: Logo & Navigation Links */}
        <div className="flex items-center gap-6">
          {/* Brand Logo matching LFSS image exactly */}
          <div 
            className="flex items-center gap-3 select-none cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="flex items-center text-2xl font-serif font-black tracking-tighter">
              <span className="text-white drop-shadow-[0_2px_4px_rgba(255,255,255,0.1)]">L</span>
              <span className="text-[#ff0033] drop-shadow-[0_2px_4px_rgba(255,0,51,0.2)]">F</span>
              <span className="text-[#ffdd00] drop-shadow-[0_2px_4px_rgba(255,221,0,0.2)]">S</span>
              <span className="text-[#ffdd00] drop-shadow-[0_2px_4px_rgba(255,221,0,0.2)] font-semibold">S</span>
            </div>
            <div className="hidden sm:flex flex-col border-l border-border-custom/25 pl-2.5">
              <span className="text-xs font-bold tracking-wide text-fg leading-tight">Lumen Frames</span>
              <span className="text-[8px] uppercase tracking-[0.18em] text-fg-muted font-bold">Stream Service</span>
            </div>
          </div>

          {/* Navigation Links matching the mockup */}
          <nav className="hidden md:flex items-center gap-1">
            <button className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-xs font-bold text-fg cursor-pointer transition-all">
              Home
            </button>
            <button 
              onClick={() => {
                alert("Lumen Frames Stream Service (LFSS) - Curated directory of clean, ad-free streaming sources.");
              }}
              className="px-3 py-1.5 text-xs font-semibold text-fg-muted hover:text-fg transition-colors cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={() => {
                const mail = "mailto:nnethunuwan@gmail.com?subject=LFSS Stream Request";
                window.open(mail, "_blank");
              }}
              className="px-3 py-1.5 text-xs font-semibold text-fg-muted hover:text-fg transition-colors cursor-pointer"
            >
              Request
            </button>
            <button 
              onClick={() => {
                alert("DMCA Notice: This app is a local metadata index only and does not host or transmit any digital media streams directly.");
              }}
              className="px-3 py-1.5 text-xs font-semibold text-fg-muted hover:text-fg transition-colors cursor-pointer"
            >
              DMCA
            </button>
          </nav>
        </div>

        {/* Right Side: Search, Region Selector, Theme Selector */}
        <div className="flex items-center gap-3">
          {/* Search bar prompt button with command palette hotkey */}
          <button
            onClick={triggerSearch}
            className="lfss-pill flex h-9 items-center gap-2 px-3 text-xs md:px-4 cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <Search size={13} className="text-fg-muted" />
            <span className="hidden sm:inline">Search sites...</span>
            <kbd className="hidden sm:inline-flex ml-2 items-center gap-0.5 rounded border border-border-custom bg-bg-elev/50 px-1.5 py-0.5 text-[9px] font-mono font-bold text-fg-muted">
              <span>⌘</span>
              <span>K</span>
            </kbd>
          </button>

          {/* Region Selector Dropdown */}
          <div className="relative" ref={regionDropdownRef}>
            <button
              onClick={() => setRegionOpen((prev) => !prev)}
              className="lfss-pill flex h-9 items-center gap-2 px-3 text-xs font-semibold cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <span className="text-sm shrink-0 leading-none">{activeRegion.flag}</span>
              <span className="hidden md:inline truncate max-w-[100px]">{activeRegion.label}</span>
              <ChevronDown size={11} className="text-fg-muted" />
            </button>

            {regionOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-border-strong bg-bg-elev p-1.5 shadow-2xl z-50">
                <div className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-fg-muted border-b border-border-custom/35 mb-1 select-none">
                  Select Region
                </div>
                <div className="space-y-0.5">
                  {regions.map((r) => {
                    const active = region === r.code;
                    return (
                      <button
                        key={r.code}
                        onClick={() => {
                          setRegion(r.code);
                          setRegionOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-2.5 py-2 text-xs rounded-lg transition-all text-left ${
                          active
                            ? "bg-bg-card-hover text-accent font-bold"
                            : "text-fg/85 hover:bg-bg-card-hover hover:text-fg"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-sm shrink-0">{r.flag}</span>
                          <span className="truncate">{r.label}</span>
                        </div>
                        {active && <Check size={11} className="text-accent shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Theme Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setThemeOpen((prev) => !prev)}
              className="lfss-pill flex h-9 items-center gap-2 px-3 text-xs font-semibold cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <Palette size={14} className="text-accent shrink-0" />
              <span className="hidden md:inline">Theme</span>
            </button>

            {themeOpen && (
              <div className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-border-strong bg-bg-elev p-1.5 shadow-2xl z-50">
                <div className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-fg-muted border-b border-border-custom/35 mb-1 select-none">
                  Switch Aesthetic
                </div>
                <div className="space-y-0.5">
                  {themes.map((t) => {
                    const active = theme === t;
                    const details = themeDetails[t] || { label: t, color: "bg-accent", icon: Palette };
                    const ThemeIcon = details.icon;
                    return (
                      <button
                        key={t}
                        onClick={() => {
                          changeTheme(t);
                          setThemeOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-2.5 py-2 text-xs rounded-lg transition-all ${
                          active
                            ? "bg-bg-card-hover text-accent font-bold"
                            : "text-fg/85 hover:bg-bg-card-hover hover:text-fg"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <ThemeIcon size={13} className={active ? "text-accent" : "text-fg-muted"} />
                          <span>{details.label}</span>
                        </div>
                        <span className={`h-2.5 w-2.5 rounded-full ${details.color} border border-white/10 shrink-0`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}
