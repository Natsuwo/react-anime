import React from "react";
import { isMobile } from "react-device-detect";
import UseIconList from "../SvgList/UseIconList";

const VideoScreen = ({
  videoRef,
  Video,
  setCurrentTime,
  setTotalTime,
  togglePlayPause,
  handleSpeedChangeMouseDown,
  handleDoubleClick,
  handleDoubleClickTime,
  skipState,
}) => {
  return (
    <div
      className="player-container"
      onMouseDown={handleSpeedChangeMouseDown}
      onDoubleClick={!isMobile ? handleDoubleClick : () => {}}
    >
      <div className="player" onClick={togglePlayPause}>
        <video
          ref={videoRef}
          id="main-video"
          onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
          onLoadedData={() => setTotalTime(videoRef.current.duration)}
          playsInline
        >
          <source src={Video} type="video/mp4" />
        </video>
        {isMobile && (
          <>
            <div
              className="tap-left"
              onDoubleClick={(event) => handleDoubleClickTime(event, "rewind")}
              style={{
                width: "50%",
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                zIndex: 10,
              }}
            ></div>

            <div
              className="tap-right"
              onDoubleClick={(event) => handleDoubleClickTime(event, "forward")}
              style={{
                width: "50%",
                position: "absolute",
                right: 0,
                top: 0,
                height: "100%",
              }}
            ></div>
          </>
        )}

        <div
          className={`player-fore-icon forward${
            skipState === "forward" ? " show" : ""
          }`}
        >
          <div className="player-fore-container">
            <div className="player-fore-icon-inner">
              <span className="player-icon">
                <UseIconList icon="play" />
              </span>
              <span className="player-icon">
                <UseIconList icon="play" />
              </span>
              <span className="player-icon">
                <UseIconList icon="play" />
              </span>
            </div>
            <div className="player-fore-text">10 seconds</div>
          </div>
        </div>

        <div
          className={`player-fore-icon rewind${
            skipState === "rewind" ? " show" : ""
          }`}
        >
          <div className="player-fore-container">
            <div className="player-fore-icon-inner">
              <span className="player-icon">
                <UseIconList icon="play" />
              </span>
              <span className="player-icon">
                <UseIconList icon="play" />
              </span>
              <span className="player-icon">
                <UseIconList icon="play" />
              </span>
            </div>
            <div className="player-fore-text">10 seconds</div>
          </div>
        </div>
      </div>
      <div className="video-cover"></div>
      <div className="video-bg fade-in"></div>
    </div>
  );
};

export default VideoScreen;
