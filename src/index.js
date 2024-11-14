import React from "react";
import ReactDOM from "react-dom/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import AppRoutes from "./AppRoutes";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ToggleContextProvider } from "./context/ToggleContext";
import { ResponsiveContextPrivider } from "./context/ResponsiveContext";
import { PlayerWideContextProvider } from "./context/PlayerWideContext";
import { MyListContextProvider } from "./context/MyListContext";
import { UserMetaContextProvider } from "./context/UserMeta";
import { CategoryContextProvider } from "./context/CategoryContext";
import { ToastMyListContextProvider } from "./context/ToastMyListContext";
import { DarkModeProvider } from "./context/DarkModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <CategoryContextProvider>
        <UserMetaContextProvider>
          <MyListContextProvider>
            <PlayerWideContextProvider>
              <ResponsiveContextPrivider>
                <ToggleContextProvider>
                  <BrowserRouter
                    future={{
                      v7_relativeSplatPath: true,
                      v7_startTransition: true,
                    }}
                  >
                    <ToastMyListContextProvider>
                      <AppRoutes />
                    </ToastMyListContextProvider>
                  </BrowserRouter>
                </ToggleContextProvider>
              </ResponsiveContextPrivider>
            </PlayerWideContextProvider>
          </MyListContextProvider>
        </UserMetaContextProvider>
      </CategoryContextProvider>
    </DarkModeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
