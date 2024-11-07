import "./App.css";
import Header from "./components/Global/Header/Header";
import { Routes, Route, useLocation } from "react-router-dom";
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
import Coupon from "./components/Page/Account/Coupon/Coupon";
import EmailSetting from "./components/Page/Account/EmailSetting/EmailSetting";
import EmailUnsubscribe from "./components/Page/Account/EmailSetting/EmailUnsubscribe";
import SubscriptionStatus from "./components/Page/Account/Subscription/Status";
import MyList from "./components/Page/MyList/MyList";
import History from "./components/Page/History/History";
import Subscription from "./components/Page/Subscription/Subscription";
import SignUp from "./components/Page/Subscription/SignUp/SignUp";
import HeaderPromote from "./components/Global/Header/HeaderPromote";
import Promote from "./components/Page/Subscription/Promote/Promote";
import useUniqueShortUserId from "./features/useUniqueShortUserId";
import Category from "./components/Page/Category/Category";
import Search from "./components/Page/Search/Search";

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

  return (
    <>
      {size.width < 992 ? (
        <HeaderMenu />
      ) : !isSubscriptionPage ? (
        <Header hideMenu={true} />
      ) : isPromotePage ? (
        <HeaderPromote />
      ) : (
        <Header />
      )}
      {/* Create User Unique ID IF First Time Access */}
      {/* <useUniqueShortUserId /> */}

      <div className={`main-container${size.width < 992 ? " __mobile" : ""}`}>
        {!isSubscriptionPage && size.width >= 992 && <Navbar />}
        <div className="main-content">
          <Routes>
            <Route path="*" element={"404 not found"}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route
              path="/video/detail/:videoId"
              element={<DetailVideo />}
            ></Route>
            <Route
              path="/video/episode/:episodeId"
              element={<EpisodeVideo />}
            ></Route>
            <Route element={<Account />}>
              <Route path="/account" element={<AccountManagement />} />
              <Route path="/badges" element={<Badges />} />
              <Route path="/coupon" element={<Coupon />} />
              <Route path="/mailnotify" element={<EmailSetting />} />
              <Route
                path="/mailnotify/unsubscribe"
                element={<EmailUnsubscribe />}
              />
            </Route>
            <Route
              path="/subscription/status"
              element={<SubscriptionStatus />}
            ></Route>
            <Route path="/subscription/signup" element={<SignUp />}></Route>
            <Route path="/subscription/promote" element={<Promote />}></Route>
            <Route
              path="/subscription/:params"
              element={<Subscription />}
            ></Route>
            <Route path="/mylist" element={<MyList />}></Route>
            <Route path="/history" element={<History />}></Route>
            <Route path="/genre/:slug" element={<Category />}></Route>
          </Routes>
          {!isSubscriptionPage && <Footer />}
          {isPromotePage && <Footer />}
        </div>
      </div>
    </>
  );
}

export default App;
