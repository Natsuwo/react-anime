import { useContext, createContext, useState, useEffect } from "react";

// create
const ResponsiveContext = createContext();

// Provider

const ResponsiveContextPrivider = ({ children }) => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ResponsiveContext.Provider value={{ size }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

// usage

const UseResponsiveContext = () => {
  return useContext(ResponsiveContext);
};

export { ResponsiveContextPrivider, UseResponsiveContext };
