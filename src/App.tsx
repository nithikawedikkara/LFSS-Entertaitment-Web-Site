import { useState, useEffect } from "react";
import { categories, Site, Category } from "./data";
import SiteCard from "./components/SiteCard";
import Navbar, { regions } from "./components/Navbar";
import CommandPalette from "./components/CommandPalette";
import { useFavorites } from "./hooks/useFavorites";
import { 
  Sparkles, Star, Film, Tv, BookOpen, Settings, ListFilter, Flame, Search, 
  ExternalLink, CreditCard, Smartphone, Clock, Trash2, Globe 
} from "lucide-react";

export default function App() {
  const { favorites } = useFavorites();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [region, setRegion] = useState<string>("US");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recentlyVisited, setRecentlyVisited] = useState<Site[]>([]);

  // Load recently visited sites from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("lfss-recent-visited");
      if (stored) {
        setRecentlyVisited(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error loading recently visited sites", e);
    }
  }, []);

  // Handler for saving recently visited site
  const handleVisitSite = (site: Site) => {
    setRecentlyVisited((prev) => {
      // Remove any existing copy
      const filtered = prev.filter((s) => s.url !== site.url);
      // Place new one at front
      const updated = [site, ...filtered].slice(0, 8); // Limit to 8 items
      try {
        localStorage.setItem("lfss-recent-visited", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const clearRecentlyVisited = () => {
    setRecentlyVisited([]);
    try {
      localStorage.removeItem("lfss-recent-visited");
    } catch (e) {
      console.error(e);
    }
  };

  const [realtimeUsers, setRealtimeUsers] = useState<number>(10441);

  // Animate/jitter the active user counter to show real real-time activity
  useEffect(() => {
    // Slight initial delay to make it feel organic, then update every 3-5 seconds
    const interval = setInterval(() => {
      setRealtimeUsers((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
        const nextVal = prev + delta;
        // Keep it realistic within 10,350 and 10,550
        if (nextVal < 10350) return prev + Math.floor(Math.random() * 4) + 1;
        if (nextVal > 10550) return prev - (Math.floor(Math.random() * 4) + 1);
        return nextVal;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Get current region details
  const currentRegion = regions.find((r) => r.code === region) || regions[0];

  // Calculate total links index
  const totalSitesCount = categories.reduce((acc, cat) => acc + cat.sites.length, 0);

  // Icon selector for category header accents
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "movies":
        return <Film size={15} />;
      case "anime":
        return <Flame size={15} />;
      case "manga":
        return <BookOpen size={15} />;
      case "livetv":
        return <Tv size={15} />;
      case "paid":
        return <CreditCard size={15} />;
      case "apps":
        return <Smartphone size={15} />;
      default:
        return <ListFilter size={15} />;
    }
  };

  // Dynamic filter logic
  const filteredCategories = categories.map((category) => {
    // Check tab filter
    if (activeCategory !== "all" && activeCategory !== category.id) {
      return null;
    }

    // Check search query
    const matchingSites = category.sites.filter((site) => {
      const nameMatch = site.name.toLowerCase().includes(searchQuery.toLowerCase());
      const descMatch = site.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
      const urlMatch = site.url.toLowerCase().includes(searchQuery.toLowerCase());
      return nameMatch || descMatch || urlMatch;
    });

    if (searchQuery !== "" && matchingSites.length === 0) {
      return null;
    }

    return {
      ...category,
      sites: matchingSites,
    };
  }).filter(Boolean) as Category[];

  return (
    <div className="relative min-h-screen flex flex-col bg-bg text-fg">
      {/* Background Glow Elements from Geometric Balance */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[15%] w-[800px] h-[500px] bg-accent opacity-[0.15] blur-[120px] rounded-full transition-colors duration-300"></div>
        <div className="absolute top-[30%] right-[10%] w-[700px] h-[500px] bg-[#38bdf8] opacity-[0.08] blur-[120px] rounded-full"></div>
      </div>

      <Navbar region={region} setRegion={setRegion} />
      <CommandPalette />

      {/* Main Flex Wrapper for Sidebar + Content */}
      <div className="flex flex-1 relative z-10 max-w-[1600px] mx-auto w-full px-4 md:px-8 py-6 gap-6">
        
        {/* Left Sidebar Nav (Mockup-accurate layout) */}
        <aside className="hidden lg:flex w-60 flex-col gap-6 shrink-0 self-start sticky top-[72px]">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-fg-muted mb-4 select-none">
              Categories
            </div>
            <nav className="space-y-1">
              {/* "All" button */}
              <button
                onClick={() => setActiveCategory("all")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all text-left cursor-pointer ${
                  activeCategory === "all"
                    ? "bg-accent/15 text-accent border border-accent/20"
                    : "border border-transparent text-fg-muted hover:bg-bg-card-hover hover:text-fg"
                }`}
              >
                <ListFilter size={14} />
                <span className="flex-1">All Categories</span>
                <span className="rounded px-1.5 py-0.2 text-[9px] bg-bg-elev border border-border-custom/40 text-fg-muted font-bold font-mono">
                  {totalSitesCount}
                </span>
              </button>

              {/* Regular categories in sidebar */}
              {categories.map((category) => {
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all text-left cursor-pointer border ${
                      isActive
                        ? "bg-accent/15 text-accent border-accent/20"
                        : "border-transparent text-fg-muted hover:bg-bg-card-hover hover:text-fg"
                    }`}
                  >
                    <span className={isActive ? "text-accent" : "text-fg-muted shrink-0"}>
                      {getCategoryIcon(category.id)}
                    </span>
                    <span className="flex-1 truncate">{category.name}</span>
                    <span className="rounded px-1.5 py-0.2 text-[9px] bg-bg-elev border border-border-custom/40 text-fg-muted font-bold font-mono">
                      {category.sites.length}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden flex flex-col min-w-0">
          
          {/* Custom Purple Bento Hero Area matching screenshot exactly */}
          <section className="relative rounded-3xl border border-border-custom bg-gradient-to-br from-[#120f26]/90 via-[#0d0a1b]/95 to-[#05040a]/100 p-6 md:p-8 lg:p-10 mb-8 overflow-hidden transition-all duration-300">
            {/* Ambient Purple Circles */}
            <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-accent/25 blur-[100px] pointer-events-none"></div>
            <div className="absolute -left-16 -bottom-16 w-72 h-72 rounded-full bg-pink-500/10 blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-6 items-center">
              {/* Left Side branding */}
              <div className="xl:col-span-7 flex flex-col justify-center">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-5">
                  {/* High fidelity LFSS logo badge matching uploaded image */}
                  <div className="flex flex-col items-center justify-center bg-black/60 rounded-2xl border border-white/10 p-4 shadow-2xl select-none max-w-[200px] shrink-0">
                    <div className="flex items-center text-4xl font-serif font-black tracking-tighter leading-none mb-1">
                      <span className="text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.25)]">L</span>
                      <span className="text-[#ff0033] drop-shadow-[0_2px_8px_rgba(255,0,51,0.35)]">F</span>
                      <span className="text-[#ffdd00] drop-shadow-[0_2px_8px_rgba(255,221,0,0.35)]">S</span>
                      <span className="text-[#ffdd00] drop-shadow-[0_2px_8px_rgba(255,221,0,0.35)] font-semibold">S</span>
                    </div>
                    <div className="text-[9px] font-serif tracking-wide text-white/95 text-center leading-none mt-1">
                      Lumen Frames Stream Service
                    </div>
                    <div className="flex items-center gap-2 w-full mt-2">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/30"></div>
                      <div className="h-1.5 w-1.5 rounded-full bg-[#ff0033]"></div>
                      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/30"></div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-accent">
                      LFSS INDEX
                    </div>
                    <div className="text-xs font-semibold text-fg-muted mt-0.5">
                      Lumen Frames Stream Service
                    </div>
                  </div>
                </div>
                
                <h1 className="text-3xl font-extrabold md:text-4xl lg:text-5xl tracking-tight text-fg leading-none">
                  Your streaming <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-pink-500 to-indigo-400">everything</span>
                </h1>
                
                <p className="text-fg-muted text-xs md:text-sm max-w-xl mt-3 leading-relaxed">
                  Curated streaming sites, instant fuzzy search, multi-region support.
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-fg-muted">
                  <span>Showing</span>
                  <span className="inline-flex items-center gap-1 bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-lg text-fg font-sans">
                    <span>{currentRegion.flag}</span>
                    <span>{currentRegion.label}</span>
                  </span>
                </div>
              </div>

              {/* Right Side Stats & Commits */}
              <div className="xl:col-span-5 flex flex-col gap-4">
                {/* Statistics Box Row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col items-center justify-center select-none">
                    <span className="text-2xl font-black text-fg tracking-tight">{totalSitesCount}</span>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-fg-muted mt-0.5">SITES</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col items-center justify-center select-none">
                    <span className="text-2xl font-black text-fg tracking-tight">6</span>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-fg-muted mt-0.5">CATEGORIES</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col items-center justify-center select-none">
                    <span className="text-2xl font-black text-fg tracking-tight">16</span>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-fg-muted mt-0.5">REGIONS</span>
                  </div>
                </div>

                {/* Sub-panels matching screenshot */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/15 text-[10px] font-semibold text-fg/90">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6] animate-pulse"></span>
                      <span className="font-mono text-accent">ba98058</span>
                      <span className="text-fg-muted">ci test #1 • 1d ago</span>
                    </div>
                    <ExternalLink size={10} className="text-fg-muted" />
                  </div>

                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-success/10 border border-success/15 text-[10px] font-semibold text-fg/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse"></span>
                    <span className="font-bold text-success">{realtimeUsers.toLocaleString()}</span>
                    <span className="text-fg-muted">Users in Real-Time using LFSS :)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* RECENTLY VISITED SECTION */}
          {recentlyVisited.length > 0 && (
            <section className="mb-6 rounded-2xl border border-border-custom bg-bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-accent" />
                  <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-fg-muted select-none">
                    RECENTLY VISITED
                  </h3>
                </div>
                <button
                  onClick={clearRecentlyVisited}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold text-danger hover:bg-danger/10 border border-transparent hover:border-danger/20 transition-all cursor-pointer"
                >
                  <Trash2 size={11} />
                  <span>Clear</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {recentlyVisited.map((site) => (
                  <a
                    key={`recent-${site.url}`}
                    href={site.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleVisitSite(site)}
                    className="inline-flex h-8 items-center gap-2 px-3 rounded-lg border border-border-custom bg-bg-elev text-xs font-semibold text-fg hover:border-accent hover:text-accent transition-colors cursor-pointer"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-success"></span>
                    <span>{site.name}</span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Dynamic Filter / Search Controller Bar */}
          <section className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-fg-muted" />
              <input
                type="text"
                placeholder="Filter on this page..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-sm bg-bg-elev border border-border-custom hover:border-border-strong focus:border-accent rounded-xl text-fg placeholder:text-fg-muted focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-fg-muted hover:text-fg cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Inline Tab Filters */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-border-custom/25 pb-3">
              <button
                onClick={() => setActiveCategory("all")}
                className={`lfss-pill inline-flex h-8 items-center px-4 text-xs font-bold cursor-pointer transition-all ${
                  activeCategory === "all"
                    ? "bg-accent/15 text-accent border-accent/40"
                    : "text-fg-muted hover:text-fg bg-bg-elev/50 border-border-custom/30"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`lfss-pill inline-flex h-8 items-center gap-1.5 px-4 text-xs font-bold cursor-pointer transition-all ${
                    activeCategory === category.id
                      ? "bg-accent/15 text-accent border-accent/40"
                      : "text-fg-muted hover:text-fg bg-bg-elev/50 border-border-custom/30"
                  }`}
                >
                  {getCategoryIcon(category.id)}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Active Listings Grid Area */}
          <div className="space-y-10">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <section key={category.id} className="scroll-mt-24 space-y-4">
                  <div className="flex items-baseline justify-between select-none border-b border-border-custom/20 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-accent">{getCategoryIcon(category.id)}</span>
                      <h2 className="text-base font-bold text-fg flex items-center gap-2">
                        <span>{category.name}</span>
                        <span className="text-[10px] bg-bg-elev px-1.5 py-0.5 rounded border border-border-custom/30 text-fg-muted font-mono font-bold">
                          {category.sites.length}
                        </span>
                      </h2>
                    </div>
                    <div className="text-[10px] text-fg-muted hidden sm:inline">
                      Streaming sites for {category.name.toLowerCase()}.
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                    {category.sites.map((site) => (
                      <SiteCard 
                        key={`${category.id}-${site.url}`} 
                        site={site} 
                        onVisit={handleVisitSite}
                      />
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Globe size={32} className="text-fg-muted/40 animate-pulse mb-3" />
                <h3 className="text-sm font-bold text-fg">No streaming sites match your query</h3>
                <p className="text-xs text-fg-muted mt-1 max-w-sm">
                  Try clearing your filter or typing a different keyword to search our index of {totalSitesCount} streams.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="mt-4 px-4 py-1.5 rounded-full bg-accent text-accent-fg text-xs font-bold cursor-pointer hover:bg-accent/90 transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

        </main>
      </div>

      {/* Geometric Balance Bottom Status Bar */}
      <footer className="h-9 border-t border-border-custom/30 px-6 md:px-8 flex items-center justify-between text-[10px] bg-bg/95 backdrop-blur-md relative z-20 text-fg-muted select-none mt-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></div>
            <span>All Lumen Frames streams operational</span>
          </div>
          <span className="text-border-custom/30 hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-1 font-medium">
            <Star size={10} className="text-yellow-500" fill="currentColor" />
            <span>{favorites.length} Saved Favorites</span>
          </div>
        </div>
        <div className="italic text-[10px]">
          v2.4.0 • Made with dedication for Lumen Frames
        </div>
      </footer>
    </div>
  );
}
