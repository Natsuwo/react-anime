import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import UseIconList from "../SvgList/UseIconList";
import { saveWatchTime } from "../../../features/useFetch";

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
  userId,
  episodeId,
  videoId,
  handleLoadedMetadata,
}) => {
  const handleVideoError = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const error = videoElement.error;
      if (error) {
        // Mã lỗi và thông tin lỗi chi tiết
        switch (error.code) {
          case error.MEDIA_ERR_ABORTED:
            console.error("Video loading aborted.");
            break;
          case error.MEDIA_ERR_NETWORK:
            console.error("Network error - please check your connection.");
            break;
          case error.MEDIA_ERR_DECODE:
            console.error("Video decoding error - file may be corrupted.");
            break;
          case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            console.error("Video format is not supported.");
            break;
          default:
            console.error("An unknown error occurred.");
            break;
        }
      }
    }
  };
  const [lastUpdateTime, setLastUpdateTime] = useState(0);

  // Sự kiện onTimeUpdate để cập nhật thời gian
  const handleTimeUpdate = () => {
    const currentWatchTime = videoRef.current.currentTime;
    setCurrentTime(currentWatchTime);

    if (Math.floor(currentWatchTime) - lastUpdateTime >= 5) {
      saveWatchTime(userId, videoId, episodeId, currentWatchTime);
      setLastUpdateTime(Math.floor(currentWatchTime)); // Cập nhật lastUpdateTime
    }

    if (videoRef.current.duration - lastUpdateTime < 0.3) {
      saveWatchTime(userId, videoId, episodeId, currentWatchTime);
      setLastUpdateTime(Math.floor(currentWatchTime)); // Cập nhật lastUpdateTime
    }
  };

  return (
    <div
      className="player-container"
      onMouseDown={handleSpeedChangeMouseDown}
      onTouchStart={handleSpeedChangeMouseDown}
      onDoubleClick={!isMobile ? handleDoubleClick : () => {}}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="player" onClick={togglePlayPause}>
        <video
          src={Video}
          ref={videoRef}
          id="main-video"
          onTimeUpdate={handleTimeUpdate}
          onLoadedData={() => {
            setTotalTime(videoRef.current?.duration);
            handleLoadedMetadata();
          }}
          playsInline
          onError={handleVideoError}
        ></video>
        {isMobile && (
          <>
            <div
              className="tap-left"
              onDoubleClick={() => handleDoubleClickTime("rewind")}
              style={{
                width: "50%",
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
              }}
            ></div>

            <div
              className="tap-right"
              onDoubleClick={() => handleDoubleClickTime("forward")}
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
