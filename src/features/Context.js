import { useContext, createContext, useState } from "react";

// create
const Context = createContext();

// provider
const ContextProvider = ({ children }) => {
  const [nav, setNav] = useState(false);
  const [isSwitcher, setSwitcher] = useState(0);
  const toggleNav = () => {
    setNav(!nav);
  };
  const handleSwitch = (opt) => {
    setSwitcher(opt);
  };

  return (
    <Context.Provider value={{ nav, toggleNav, handleSwitch, isSwitcher }}>
      {children}
    </Context.Provider>
  );
};

// usage the create
const UseContext = () => {
  return useContext(Context);
};

export { ContextProvider, UseContext };
