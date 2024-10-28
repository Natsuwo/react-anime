import React from "react";

const Seekbar = ({
  seekbarRef,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  buffered,
  progress,
}) => {
  return (
    <div className="seekbar" ref={seekbarRef}>
      <div
        className="seekbar-inner"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        // onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
        // onMouseLeave={handleMouseUp}
      >
        <div className="seekbar-loading">
          <div
            className="seekbar-buffer"
            style={{ width: `${buffered}%` }}
          ></div>
          <div
            className="seekbar-highlighter"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
        <div
          className="seekbar-handle"
          style={{
            width: `${progress}%`,
          }}
        >
          <span className="seekbar-handle-maker"></span>
        </div>
      </div>
    </div>
  );
};

export default Seekbar;
