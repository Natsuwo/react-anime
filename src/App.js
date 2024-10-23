import "./App.css";
import Header from "./components/Global/Header/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Page/Home/Home";
import Navbar from "./components/Global/Navbar/Navbar";
import { UseResponsiveContext } from "./context/ResponsiveContext";
import HeaderMenu from "./components/Mobile/Global/Header/Header";
import DetailVideo from "./components/Page/Video/DetailVideo/DetailVideo";
import Footer from "./components/Global/Footer/Footer";
import EpisodeVideo from "./components/Page/Video/EpisodeVideo/EpisodeVideo";
import Account from "./components/Page/Account/Account";
import Badges from "./components/Page/Account/Badges/Badges";
import AccountManagement from "./components/Page/Account/AccountManagement/AccountManagement";

function App() {
  const { size } = UseResponsiveContext();
  return (
    <>
      {size.width < 992 ? <HeaderMenu /> : <Header />}
      <div className="main-container">
        {size.width < 992 ? "" : <Navbar />}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/video/detail/:params"
              element={<DetailVideo />}
            ></Route>
            <Route
              path="/video/episode/:videoId"
              element={<EpisodeVideo />}
            ></Route>
            <Route element={<Account />}>
              <Route path="/account" element={<AccountManagement />} />
              <Route path="/badges" element={<Badges />} />
            </Route>
          </Routes>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
