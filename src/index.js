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
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <PlayerWideContextProvider>
      <ResponsiveContextPrivider>
        <ToggleContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ToggleContextProvider>
      </ResponsiveContextPrivider>
    </PlayerWideContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
