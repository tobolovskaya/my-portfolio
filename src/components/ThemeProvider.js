import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const validThemes = ["blue", "dark", "purple", "system"];

  const savedTheme = localStorage.getItem("theme");
  const isValidTheme = (value) =>
    value !== null && validThemes.includes(value);

  const [theme, setTheme] = useState(() =>
    isValidTheme(savedTheme) ? savedTheme : "system"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("theme-dark", "theme-blue", "theme-purple");

    const applyTheme = (resolvedTheme) => {
      if (resolvedTheme === "dark") {
        root.classList.add("theme-dark");
      } else if (resolvedTheme === "blue") {
        root.classList.add("theme-blue");
      } else if (resolvedTheme === "purple") {
        root.classList.add("theme-purple");
      } else {
        // system preference
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.add(isDark ? "theme-dark" : "theme-blue");
      }
    };

    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
