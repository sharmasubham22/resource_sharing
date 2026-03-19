import { useEffect, useState } from "react";
import {Sun, Moon} from 'lucide-react';

export default function DarkMode() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-3 py-2 rounded text-brand"
    >
      {darkMode ? (
        <Sun
          strokeWidth={1.5}
          className="cursor-pointer hover:text-brand-strong"
        />
      ) : (
        <Moon
          strokeWidth={1.5}
          className="cursor-pointer hover:text-brand-strong"
        />
      )}
    </button>
  );
}
