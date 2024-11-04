import React, { useEffect, useState } from "react";
import "./Banner.css";
import UseIconList from "../../../Global/SvgList/UseIconList";
import trailerVideo from "../../../../assets/videos/trailer-1.mp4";
import Carousel from "./Carousel";
import {
  FetchAllLimit,
  FetchSingleDocumentByKey,
} from "../../../../features/useFetch";
import LayoutSwitcher from "../../../Global/Banner/LayoutSwitcher/LayoutSwitcher";
import { UseToggleContext } from "../../../../context/ToggleContext";

const Banner = ({ isHovered, handleHovered }) => {
  const [isMute, setIsMute] = useState(true);
  // Category Data
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // active sort
  const { isSwitcher, handleSwitch } = UseToggleContext();

  const handleCategoriesList = async () => {
    setLoading(true);
    const categorysList = await FetchAllLimit("Categories");
    categorysList.map(async (item) => {
      const data = await FetchSingleDocumentByKey(
        "Videos",
        "category_id",
        item.category_id,
        true
      );
      const dataWithCategory = { ...data, category_name: item.category_id };
      setCategoryData((prev) => {
        if (
          !prev.some(
            (existingItem) => existingItem.category_name === item.category_id
          )
        ) {
          return [...prev, dataWithCategory];
        }
        return prev;
      });
      setLoading(false);
    });
  };

  useEffect(() => {
    handleCategoriesList();
  }, []);

  return (
    <div className="main-banner">
      <div
        className={`banner-video${isHovered ? " hover" : ""}`}
        onMouseEnter={() => handleHovered(true)}
        onMouseLeave={() => handleHovered(false)}
      >
        <div className="banner-player">
          <video src={trailerVideo}></video>
          <button
            className="sound-icon"
            onMouseEnter={() => handleHovered(false)}
            onMouseLeave={() => handleHovered(true)}
            onClick={() => setIsMute(!isMute)}
          >
            <UseIconList
              icon={isMute ? "volume-off" : "volume"}
              width={48}
              height={48}
            />
          </button>
        </div>
        <div className="banner-video-detail">
          <div className="live">
            <div className="live-text">On Live</div>
            <div className="live-icon-container">
              <div className="icon-live"></div>
            </div>
          </div>
          <div className="title">
            <span className="main-title">Shinyanakapanchi</span>
            <span className="episode">#1~12</span>
          </div>
          <div className="info">
            <div className="date">Oct 11 (Fri)</div>
            <div className="time">15:10 ~ 20:57</div>
            <div className="views">53k views</div>
          </div>
          <button className="view-more">
            <UseIconList icon="play" />
            Watch now
          </button>
        </div>
        <div className="main-carousel">
          <div
            className="slide-carousel-switch"
            onMouseEnter={() => handleHovered(false)}
            onMouseLeave={() => handleHovered(true)}
          >
            <LayoutSwitcher
              handleSwitch={handleSwitch}
              isSwitcher={isSwitcher}
            ></LayoutSwitcher>
          </div>
          <div
            onMouseEnter={() => handleHovered(false)}
            onMouseLeave={() => handleHovered(true)}
          >
            <Carousel data={categoryData} isLoading={isLoading} />
          </div>
        </div>
        <div className="overlay-left-side-wrapper">
          <div className="overlay-left-side"></div>
        </div>
        <div className="overlay-bottom"></div>
      </div>
    </div>
  );
};

export default Banner;
