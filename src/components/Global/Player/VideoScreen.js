import React from "react";
import { UseResponsiveContext } from "../../../context/ResponsiveContext";

const VideoScreen = ({
  videoRef,
  Video,
  setCurrentTime,
  setTotalTime,
  togglePlayPause,
  handleSpeedChangeMouseDown,
  handleDoubleClick,
  handleRewindForward,
}) => {
  const { size } = UseResponsiveContext();
  return (
    <div
      className="player-container"
      onMouseDown={handleSpeedChangeMouseDown}
      onDoubleClick={size.width > 991 && handleDoubleClick}
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
        {size.width < 767 && (
          <>
            <div
              className="tap-left"
              onDoubleClick={() => handleRewindForward("rewind")}
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
              onDoubleClick={() => handleRewindForward("forward")}
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
      </div>
      <div className="video-cover"></div>
      <div className="video-bg fade-in"></div>
    </div>
  );
};

export default VideoScreen;
