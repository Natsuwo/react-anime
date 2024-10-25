import React from "react";

const VideoScreen = ({
  videoRef,
  Video,
  setCurrentTime,
  setTotalTime,
  togglePlayPause,
  handleSpeedChangeMouseDown,
  handleDoubleClick,
}) => {
  return (
    <div
      className="player-container"
      onMouseDown={handleSpeedChangeMouseDown}
      onDoubleClick={handleDoubleClick}
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
      </div>
      <div className="video-cover"></div>
      <div className="video-bg fade-in"></div>
    </div>
  );
};

export default VideoScreen;
