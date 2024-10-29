import React from "react";
import UseIconList from "../SvgList/UseIconList";

const PiPButon = ({ readyToPlay, handlePlay, isLoading }) => {
  return (
    <>
      {!readyToPlay && !isLoading && (
        <div
          onClick={() => handlePlay("play")}
          className="play-button-onload-wrapper"
        >
          <div className="play-button-onload-inner">
            <span className="play-button-onload">
              <UseIconList icon="play" />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default PiPButon;
