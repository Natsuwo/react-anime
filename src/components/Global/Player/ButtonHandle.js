import React from "react";
import UseIconList from "../SvgList/UseIconList";

const ButtonHandle = ({
  isLoading,
  showPlayPauseIcon,
  isPlaying,
  isPip,
  handlePlay,
}) => {
  return (
    <>
      {isLoading && (
        <div className="video-loader-icon">
          <span className="icon-loading">
            <svg className="player-icon-loading" viewBox="25 25 50 50">
              <circle
                className="player-icon-circle"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                strokeWidth="5"
                strokeMiterlimit="10"
              ></circle>
            </svg>
          </span>
        </div>
      )}
      <div
        className="video-play-pause-icon-wrapper"
        style={{ display: showPlayPauseIcon ? "block" : "" }}
      >
        <div className="play-pause-icon-inner">
          <div className="play-pause-icon">
            <UseIconList icon={isPlaying ? "play" : "pause"} />
          </div>
        </div>
      </div>
      {!isPlaying && isPip && (
        <div
          className="video-play-icon-pip-wrapper"
          onClick={() => handlePlay("play")}
        >
          <div className="video-play-icon-pip-inner">
            <div className="video-play-icon-pip">
              <UseIconList icon="play" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ButtonHandle;
