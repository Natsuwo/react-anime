import React, { useState } from "react";
import "./Banner.css";
import UseIconList from "../../../Global/SvgList/UseIconList";
import trailerVideo from "../../../../assets/videos/trailer-1.mp4";
import Carousel from "./Carousel";
const Banner = ({ isHovered, handleHovered }) => {
  const [isMute, setIsMute] = useState(true);
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
        <Carousel handleHovered={handleHovered}></Carousel>
        <div className="overlay-left-side-wrapper">
          <div className="overlay-left-side"></div>
        </div>
        <div className="overlay-bottom"></div>
      </div>
    </div>
  );
};

export default Banner;
