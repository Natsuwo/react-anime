import "./App.css";
import Header from "./components/Global/Header/Header";
import { useLocation, Outlet } from "react-router-dom";
import Navbar from "./components/Global/Navbar/Navbar";
import { UseResponsiveContext } from "./context/ResponsiveContext";
import HeaderMenu from "./components/Mobile/Global/Header/Header";
import Footer from "./components/Global/Footer/Footer";

import HeaderPromote from "./components/Global/Header/HeaderPromote";
import useUniqueShortUserId from "./features/useUniqueShortUserId";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import Modal from "./components/Modal/Modal";
import FirstLoading from "./components/Global/FirstLoading/FirstLoading";

function App() {
  useUniqueShortUserId();
  const { size } = UseResponsiveContext();
  const location = useLocation();

  // Check trang subs thì loại bỏ navbar
  const isSubscriptionPage = /^\/subscription\/(?!status\b)\w+/i.test(
    location.pathname
  );

  const isPromotePage = /^\/subscription\/promote\b/i.test(location.pathname);

  // const isSubscriptionPage =
  // /^\/subscription\/(?!status\b)(?!signup\b)\w+/i.test(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    startLoading();
    setTimeout(() => {
      finishLoading();
    }, 300);
  }, [location.pathname]);

  const [progress, setProgress] = useState(0);

  const startLoading = () => {
    setProgress(30); // Bắt đầu thanh loading
  };

  // Khi loading hoàn tất
  const finishLoading = () => {
    setProgress(100);
  };

  const [visible, setVisible] = useState(!localStorage.getItem("FIRST_LOAD"));
  console.log(visible);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        localStorage.setItem("FIRST_LOAD", true);
        setVisible(false);
      }, 3000);
    }
  }, [visible]);
  return (
    <>
      <Modal
        visible={visible}
        setVisible={setVisible}
        className="first-loading"
      >
        <FirstLoading></FirstLoading>
      </Modal>
      <LoadingBar color="var(--link-active)" progress={progress} />
      {size.width < 992 ? (
        <HeaderMenu />
      ) : !isSubscriptionPage ? (
        <Header hideMenu={true} />
      ) : isPromotePage ? (
        <HeaderPromote />
      ) : (
        <Header />
      )}

      <div className={`main-container${size.width < 992 ? " __mobile" : ""}`}>
        {!isSubscriptionPage && size.width >= 992 && <Navbar />}
        <div className="main-content">
          <Outlet />
          {!isSubscriptionPage && <Footer />}
          {isPromotePage && <Footer />}
        </div>
      </div>
    </>
  );
}

export default App;
