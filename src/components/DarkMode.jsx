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
      className="px-3 py-2 rounded text-text-primary"
    >
      {darkMode ? (
        <Sun
          strokeWidth={1.5}
          className="cursor-pointer hover:text-brand-medium"
        />
      ) : (
        <Moon
          strokeWidth={1.5}
          className="cursor-pointer hover:text-brand-medium"
        />
      )}
    </button>
    // <label class="inline-flex items-center cursor-pointer">
    //   <Moon strokeWidth={1.5} className="cursor-pointer hover:text-brand-medium"/>
    //   <input type="checkbox" value="" onClick={()=> setDarkMode(!darkMode)} class="sr-only peer"/>
    //   <div class="relative mx-3 w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
    //   <Sun strokeWidth={1.5} className="cursor-pointer hover:text-brand-medium" />
    // </label>
  );
}
