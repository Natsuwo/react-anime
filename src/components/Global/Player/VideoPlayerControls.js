import React from "react";
import UseIconList from "../SvgList/UseIconList";
import Seekbar from "./Seekbar";
import VolumeControl from "./VolumeControl";
import Tooltip from "../Tooltip/Tooltip";

const VideoPlayerControls = ({
  seekbarRef,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handlePlay,
  volumeRef,
  volume,
  isPlaying,
  startDrag,
  isMute,
  progress,
  buffered,
  currentTime,
  totalTime,
  playbackRate,
  wideMode,
  handleRewindForward,
  handleSpeedChange,
  handleMute,
  handleFullScreen,
  isFullscreen,
  handleWide,
  showControls,
}) => {
  const arrSpeedList = [
    { id: "speed-1x", speed: "1" },
    { id: "speed-1-3x", speed: "1.3" },
    { id: "speed-1-5x", speed: "1.5" },
    { id: "speed-1-7x", speed: "1.7" },
    { id: "speed-2x", speed: "2" },
  ];

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    // Nếu có giờ (hrs > 0) thì định dạng HH:MM:SS
    if (hrs > 0) {
      return `${hrs.toString().padStart(1, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    // Nếu không có giờ thì định dạng MM:SS
    return `${mins.toString().padStart(1, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div
      className={`controls grid-controls${
        !showControls && isPlaying ? " hide" : ""
      }`}
    >
      <Seekbar
        seekbarRef={seekbarRef}
        handleMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        buffered={buffered}
        progress={progress}
      />
      <div className="control-left">
        <button
          className="playback-btn"
          onClick={() => (isPlaying ? handlePlay("pause") : handlePlay("play"))}
        >
          <Tooltip
            condition={isPlaying}
            textTrue={"Pause (Space)"}
            textFalse={"Play (Space)"}
            position="left"
          />
          <span className="player-icon">
            <UseIconList icon={isPlaying ? "pause" : "play"} />
          </span>
        </button>
        <button
          onClick={() => handleRewindForward("rewind")}
          className="rewind-btn"
        >
          <Tooltip
            condition={true}
            textTrue={"Back 10s (←)"}
            textFalse={"Back 10s (←)"}
            position="center"
          />
          <span className="player-icon">
            <UseIconList icon="seek-back-10" />
          </span>
        </button>
        <button
          onClick={() => handleRewindForward("forward")}
          className="advances-btn"
        >
          <Tooltip
            condition={true}
            textTrue={"Next 10s (→)"}
            textFalse={"Next 10s (→)"}
            position="center"
          />
          <span className="player-icon">
            <UseIconList icon="seek-forward-10" />
          </span>
        </button>
        <div className="bar-time">
          <span className="time-text">
            <time dateTime="PT29S">{formatTime(currentTime)}</time>
            <span className="time-separator">/</span>
            <time dateTime="PT23M42S">{formatTime(totalTime)}</time>
          </span>
        </div>
      </div>
      <div className="control-right">
        <button className="playback-rate-btn">
          <span className="player-icon">
            <UseIconList
              icon={
                playbackRate === "1"
                  ? "fast-1x"
                  : playbackRate === "1.3"
                  ? "fast-1-3x"
                  : playbackRate === "1.5"
                  ? "fast-1-5x"
                  : playbackRate === "1.7"
                  ? "fast-1-7x"
                  : "fast-2x"
              }
            />
          </span>
          <div className="speed-select-wrapper">
            <div className="speed-select-play-rate">
              <div className="speed-tooltip">
                <span className="speed-title">Speed</span>
                <ul className="speed-select-inner">
                  {arrSpeedList.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleSpeedChange(item.speed)}
                      className="speed-select-items"
                    >
                      <div
                        className={`radio-checkbox${
                          playbackRate === item.speed ? " checked" : ""
                        }`}
                      >
                        <input
                          key={item.id}
                          type="radio"
                          id={item.id}
                          className="radio-input"
                          value={item.speed}
                        />
                        <span className="icon-check">
                          <UseIconList icon="checkbox" />
                        </span>
                      </div>
                      <label htmlFor={item.id}>{item?.speed}x</label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </button>
        <button className="full-screen-in-browser-btn" onClick={handleWide}>
          <Tooltip
            condition={wideMode}
            textTrue={"Default Mode (Shift + F)"}
            textFalse={"Wide Mode (Shift + F)"}
            position="center"
          />
          <span className="player-icon">
            <UseIconList icon={wideMode ? "wide-on" : "wide"} />
          </span>
        </button>
        <button className="full-screen-btn" onClick={handleFullScreen}>
          <Tooltip
            condition={isFullscreen}
            textTrue={"Exit Full Screen (F)"}
            textFalse={"Full Screen (F)"}
            position="center"
          />
          <span className="player-icon">
            <UseIconList
              icon={isFullscreen ? "fullscreen-exit" : "fullscreen"}
            />
          </span>
        </button>
        <VolumeControl
          handleMute={handleMute}
          isMute={isMute}
          volumeRef={volumeRef}
          volume={volume}
          startDrag={startDrag}
        />
      </div>
    </div>
  );
};

export default VideoPlayerControls;
