import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import UseIconList from "../SvgList/UseIconList";
import { addIcon, playIcon } from "../SvgList/IconList";

export const CardSlide = ({ index, isActive, onCardClick }) => {
  return (
    <div
      onClick={() => onCardClick(index)}
      className={`main-card nobold${isActive ? " active" : ""}`}
    >
      <div className="card-overlay"></div>
      <div className="thumbnail">
        <img
          width="208"
          height="117"
          src="https://image.p-c2-x.abema-tv.com/media/channels/time/20241013035220/abema-anime.webp?height=288&quality=75&width=512"
          alt=""
        />
      </div>
      <div className="main-tag">
        <img
          width="146"
          height="55"
          src="https://image.p-c2-x.abema-tv.com/image/channels/abema-anime/logo.png?height=96&quality=75&version=20200413&width=256"
          alt=""
        />
      </div>
    </div>
  );
};

export const CardVideo = ({ title }) => {
  return (
    <div className="video-card-wrapper">
      <Link to="#" className="link-block video-card">
        <div className="video-card-thumbnail">
          <img
            src="https://image.p-c2-x.abema-tv.com/image/creatives/2b645eac-3646-441e-a266-12d473e8c785/2b645eac-3646-441e-a266-12d473e8c785?background=000000&fit=fill&height=576&quality=75&width=1024"
            alt=""
          />
        </div>
        <div className="video-card-detail-container">
          <div className="video-card-detail">
            <div
              className="video-card-title clamp-text"
              style={{
                lineHeight: 1.5,
                maxHeight: "3em",
                WebkitLineClamp: 2,
              }}
            >
              {title}
            </div>
            <time className="video-release-date">10月15日(火) 09:40 〜</time>
            <div className="video-new-episode">
              <div className="video-new-episode-text">New Episode</div>
            </div>
            <div className="video-label">
              <span className="label-text free">Free</span>
            </div>
          </div>
          <button className="video-card-action">
            <UseIconList icon={addIcon} tag="add"></UseIconList>
          </button>
        </div>
      </Link>
    </div>
  );
};

export const CardList = () => {
  return (
    <div className="card-list-wrapper">
      <div className="card-content">
        <div className="card-overlay"></div>
        <div className="thumbnail">
          <img
            width="208"
            height="117"
            src="https://image.p-c2-x.abema-tv.com/media/channels/time/20241013035220/abema-anime.webp?height=288&quality=75&width=512"
            alt=""
          />
        </div>
        <div className="main-tag">
          <img
            width="146"
            height="55"
            src="https://image.p-c2-x.abema-tv.com/image/channels/abema-anime/logo.png?height=96&quality=75&version=20200413&width=256"
            alt=""
          />
        </div>
      </div>
      <div className="watch-now-text">
        <UseIconList icon={playIcon} tag="play" />
        Watch now
      </div>
    </div>
  );
};
