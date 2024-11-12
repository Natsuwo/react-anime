import React, { useEffect, useRef, useState } from "react";
import "./Banner.css";
import UseIconList from "../../../Global/SvgList/UseIconList";
import Carousel from "./Carousel";
import LayoutSwitcher from "../../../Global/Banner/LayoutSwitcher/LayoutSwitcher";
import { UseToggleContext } from "../../../../context/ToggleContext";
import { formatTimestamp, formatViews } from "../../../../features/helper";
import { FetchSingleDocumentByKey } from "../../../../features/useFetch";
import { Link } from "react-router-dom";
import SponsoredContainer from "../Sponsored/SponsoredContainer";

const Banner = ({ isHovered, handleHovered, data, isLoading }) => {
  const [isMute, setIsMute] = useState(true);
  const [selected, setSelected] = useState({});
  const [isSponsored, setSponsored] = useState(false);
  const videoRef = useRef(null);

  // active sort
  const { isSwitcher, handleSwitch } = UseToggleContext();

  const handleSelect = (index) => {
    if (index === 99) {
      setSponsored(true);
    }
    const select = data[index];
    setSelected(select);
  };

  const handleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMute(!isMute);
  };

  useEffect(() => {
    if (data.length) {
      handleSelect(0);
    }
  }, [data]);

  useEffect(() => {
    if (videoRef.current) {
      setIsMute(videoRef.current.muted);
    }
  }, []);

  return (
    <div className="main-banner">
      <div
        className={`banner-video${isHovered ? " hover" : ""}`}
        onMouseEnter={() => handleHovered(true)}
        onMouseLeave={() => handleHovered(false)}
      >
        {!isSponsored && (
          <>
            <div className="banner-player">
              <video
                ref={videoRef}
                src={selected?.trailer_video}
                muted
                autoPlay
              ></video>
              <button
                className="sound-icon"
                onMouseEnter={() => handleHovered(false)}
                onMouseLeave={() => handleHovered(true)}
                onClick={handleMute}
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
                <div className="live-text">On Going</div>
                <div className="live-icon-container">
                  <div className="icon-live"></div>
                </div>
              </div>
              <div className="title">
                <span className="main-title">{selected?.title}</span>
                <span className="episode">#1~12</span>
              </div>
              <div className="info">
                <div className="date">
                  {formatTimestamp(selected?.upload_date, "date")}
                </div>
                <div className="time">
                  {formatTimestamp(selected?.upload_date, "time")}
                </div>
                <div className="views">
                  {formatViews(selected?.views_count)}
                </div>
              </div>
              <Link to={`/video/detail/${selected?.id}`}>
                <button className="view-more">
                  <UseIconList icon="play" />
                  Watch now
                </button>
              </Link>
            </div>
          </>
        )}
        {isSponsored && (
          <SponsoredContainer
            handleVastLoaded={(option) => {
              if (option) {
                setSponsored(false);
              }
            }}
            handleVastRun={() => {}}
            className="mt"
          />
        )}
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
            <Carousel
              isSponsored={isSponsored}
              sponsored={true}
              data={data}
              isLoading={isLoading}
              handleSelect={handleSelect}
            />
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
