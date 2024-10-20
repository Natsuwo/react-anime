import React from "react";
import "./Player.css";
import Video from "../../../assets/videos/trailer-1.mp4";
import UseIconList from "../SvgList/UseIconList";

const Player = () => {
  return (
    <div className="yurei-player-wrapper">
      <div className="yurei-pip-mode"></div>
      <div className="yurei-player">
        <div className="player-container">
          <div className="player">
            <video id="main-video" src={Video} playsInline></video>
          </div>
          <div className="video-cover"></div>
          <div className="video-bg fade-in"></div>
        </div>
        <div className="controls grid-controls">
          <div className="seekbar">
            <div className="seekbar-inner">
              <div className="seekbar-loading"></div>
              <div className="seekbar-handle">
                <span className="seekbar-handle-maker"></span>
              </div>
            </div>
          </div>
          <div className="control-left">
            <button className="playback-btn">
              <span className="player-icon">
                <UseIconList icon="play" />
              </span>
            </button>
            <button className="rewind-btn">
              <span className="player-icon">
                <UseIconList icon="seek-back-10" />
              </span>
            </button>
            <button className="advances-btn">
              <span className="player-icon">
                <UseIconList icon="seek-forward-10" />
              </span>
            </button>
            <div className="bar-time">
              <span className="time-text">
                <time dateTime="PT29S">0:29</time>
                <span className="time-separator">/</span>
                <time dateTime="PT23M42S">23:42</time>
              </span>
            </div>
          </div>
          <div className="control-right">
            <button className="playback-rate-btn">
              <span className="player-icon">
                <UseIconList icon="fast-1x" />
              </span>
            </button>
            <button className="full-screen-in-browser-btn">
              <span className="player-icon">
                <UseIconList icon="wide" />
              </span>
            </button>
            <button className="full-screen-btn">
              <span className="player-icon">
                <UseIconList icon="fullscreen" />
              </span>
            </button>
            <button className="volume-btn">
              <span className="player-icon">
                <UseIconList icon="volume" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
