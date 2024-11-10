import React from "react";
import ReactDOM from "react-dom/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ToggleContextProvider } from "./context/ToggleContext";
import { ResponsiveContextPrivider } from "./context/ResponsiveContext";
import { PlayerWideContextProvider } from "./context/PlayerWideContext";
import { MyListContextProvider } from "./context/MyListContext";
import { UserMetaContextProvider } from "./context/UserMeta";
import { CategoryContextProvider } from "./context/CategoryContext";
import { ToastMyListContextProvider } from "./context/ToastMyListContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CategoryContextProvider>
      <UserMetaContextProvider>
        <MyListContextProvider>
          <PlayerWideContextProvider>
            <ResponsiveContextPrivider>
              <ToggleContextProvider>
                <BrowserRouter>
                  <ToastMyListContextProvider>
                    <App />
                  </ToastMyListContextProvider>
                </BrowserRouter>
              </ToggleContextProvider>
            </ResponsiveContextPrivider>
          </PlayerWideContextProvider>
        </MyListContextProvider>
      </UserMetaContextProvider>
    </CategoryContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
