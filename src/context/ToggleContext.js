import { useContext, createContext, useState } from "react";

// create
const ToggleContext = createContext();

// provider
const ToggleContextProvider = ({ children }) => {
  const [nav, setNav] = useState(false);
  const [isSwitcher, setSwitcher] = useState(0);
  const toggleNav = () => {
    setNav(!nav);
  };
  const handleSwitch = (opt) => {
    setSwitcher(opt);
  };

  return (
    <ToggleContext.Provider
      value={{ nav, toggleNav, handleSwitch, isSwitcher }}
    >
      {children}
    </ToggleContext.Provider>
  );
};

// usage the create
const UseToggleContext = () => {
  return useContext(ToggleContext);
};

export { ToggleContextProvider, UseToggleContext };
