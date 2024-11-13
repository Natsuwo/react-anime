import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Page/Home/Home";
import DetailVideo from "./components/Page/Video/DetailVideo/DetailVideo";
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
import Promote from "./components/Page/Subscription/Promote/Promote";
import Category from "./components/Page/Category/Category";
import Search from "./components/Page/Search/Search";
import App from "./App";
import NotFound from "./components/Page/404/NotFound";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/" element={<App />}>
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
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
