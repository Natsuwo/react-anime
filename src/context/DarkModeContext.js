import React, { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (!savedMode) return null;
    return savedMode === "true" || false;
  });

  useEffect(() => {
    if (darkMode === null) {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.body.classList.toggle("dark-theme", isDarkMode);
    } else {
      document.body.classList.toggle("dark-theme", darkMode);
      localStorage.setItem("darkMode", darkMode);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
