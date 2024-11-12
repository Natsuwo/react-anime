import React from "react";
import PlayerVast from "../../../Global/Player/PlayerVast";

const SponsoredContainer = ({
  className,
  handleVastLoaded,
  handleVastRun,
  repeat,
}) => {
  return (
    <div className={`sponsored-container ${className}`}>
      <div className="sponsored-ad">
        <div className="sponsored-content">
          <div className="overview">
            <div className="logo">
              <img
                src="https://image.p-c2-x.abema-tv.com/image/creatives/8071b785-98ff-4233-a021-971fcedafece/8071b785-98ff-4233-a021-971fcedafece?height=256&quality=75&width=256"
                alt=""
              />
            </div>
            <div className="description">Long, Many, Good</div>
            <button className="btn btn-special">More Details</button>
          </div>
          <div className="preview">
            <PlayerVast
              repeat={repeat}
              handleVastLoaded={handleVastLoaded}
              handleVastRun={handleVastRun}
            ></PlayerVast>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsoredContainer;
