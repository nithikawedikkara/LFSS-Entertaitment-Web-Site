import { useEffect, useState } from "react";

export const themes = ["purple-dark", "midnight", "synthwave", "paper", "terminal"];

export function useTheme() {
  const [theme, setTheme] = useState("purple-dark");

  const loadTheme = () => {
    try {
      const saved = localStorage.getItem("tbcpl-theme") || "purple-dark";
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } catch (e) {
      console.error("Failed to load theme from localStorage", e);
    }
  };

  useEffect(() => {
    loadTheme();

    const handleUpdate = () => {
      loadTheme();
    };

    window.addEventListener("tbcpl-theme-updated", handleUpdate);
    return () => {
      window.removeEventListener("tbcpl-theme-updated", handleUpdate);
    };
  }, []);

  const changeTheme = (newTheme: string) => {
    try {
      setTheme(newTheme);
      localStorage.setItem("tbcpl-theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      window.dispatchEvent(new Event("tbcpl-theme-updated"));
    } catch (e) {
      console.error("Failed to set theme", e);
    }
  };

  return { theme, changeTheme };
}
