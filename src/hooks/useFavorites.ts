import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  const loadFavorites = () => {
    try {
      const saved = localStorage.getItem("tbcpl-favorites");
      if (saved) {
        setFavorites(JSON.parse(saved));
      } else {
        setFavorites([]);
      }
    } catch (e) {
      console.error("Failed to load favorites from localStorage", e);
    }
  };

  useEffect(() => {
    loadFavorites();

    const handleUpdate = () => {
      loadFavorites();
    };

    // Listen to custom updates and storage synchronizations
    window.addEventListener("tbcpl-favorites-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("tbcpl-favorites-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const toggleFavorite = (site: any) => {
    try {
      const saved = localStorage.getItem("tbcpl-favorites");
      const current = saved ? JSON.parse(saved) : [];
      let updated;
      
      if (current.find((f: any) => f.url === site.url)) {
        updated = current.filter((f: any) => f.url !== site.url);
      } else {
        updated = [...current, site];
      }
      
      localStorage.setItem("tbcpl-favorites", JSON.stringify(updated));
      setFavorites(updated);
      
      // Notify all hook instances of the state change
      window.dispatchEvent(new Event("tbcpl-favorites-updated"));
    } catch (e) {
      console.error("Failed to toggle favorite", e);
    }
  };

  const isFavorite = (url: string) => !!favorites.find(f => f.url === url);

  return { favorites, toggleFavorite, isFavorite };
}
