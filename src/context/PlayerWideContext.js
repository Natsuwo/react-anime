import { useContext, createContext, useState } from "react";

const PlayerWideContext = createContext();

// Provider

const PlayerWideContextProvider = ({ children }) => {
  const [wideMode, setWideMode] = useState(false);
  const handleWide = () => {
    setWideMode(!wideMode);
  };
  return (
    <PlayerWideContext.Provider value={{ handleWide, wideMode }}>
      {children}
    </PlayerWideContext.Provider>
  );
};

// Usage

const UsePlayerWide = () => {
  return useContext(PlayerWideContext);
};

export { PlayerWideContextProvider, UsePlayerWide };
