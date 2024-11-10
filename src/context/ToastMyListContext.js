import { useContext, createContext, useState, useEffect } from "react";
import ModalAlert from "../components/Modal/ModalAlert";
import { Link } from "react-router-dom";

// create
const ToastMyListContext = createContext();

// provider
const ToastMyListContextProvider = ({ children }) => {
  const [toastVisible, setIsVisible] = useState(false);
  const [condition, setCondition] = useState(false);
  const handleToast = (option) => {
    setIsVisible(option);
  };
  const handleToastCondition = (option) => {
    setCondition(option);
  };
  return (
    <ToastMyListContext.Provider
      value={{ toastVisible, handleToast, handleToastCondition }}
    >
      {children}
      <ModalAlert visible={toastVisible} setVisible={setIsVisible}>
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {condition ? (
            <>
              <p className="clamp-text" style={{ WebkitLineClamp: 1 }}>
                This video has been added into My List
              </p>
              <Link style={{ flexShrink: 0 }} to="/mylist">
                <button
                  style={{ WebkitLineClamp: 1 }}
                  className="btn btn-black clamp-text"
                >
                  Check it
                </button>
              </Link>
            </>
          ) : (
            <p>This video has been delete from My List</p>
          )}
        </div>
      </ModalAlert>
    </ToastMyListContext.Provider>
  );
};

// usage the create
const UseToastMyListContext = () => {
  return useContext(ToastMyListContext);
};

export { ToastMyListContextProvider, UseToastMyListContext };
