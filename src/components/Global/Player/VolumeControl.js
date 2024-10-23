import React from "react";
import UseIconList from "../SvgList/UseIconList";

const VolumeControl = ({
  handleMute,
  isMute,
  volumeRef,
  volume,
  startDrag,
}) => {
  return (
    <button className="volume-btn" onClick={handleMute}>
      <span className="player-icon">
        <UseIconList icon={isMute ? "volume-off" : "volume"} />
      </span>
      <div
        className="volume-tooltip-wrapper"
        ref={volumeRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="volume-tooltip-inner" onMouseDown={startDrag}>
          <div className="volume-bar-wrapper">
            <span className="volume-bar">
              <div
                className="volume-handle"
                style={{ height: `${volume * 100}%` }}
              >
                <div className="volume-maker"></div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default VolumeControl;
