import React from "react";
import "./ChannelList.css";
import CardList from "./CardList";

const ChannelList = () => {
  const videos = Array.from({ length: 12 }, (_, i) => ({
    id: i,
  }));

  return (
    <div className="channel-list-wrapper">
      <div className="channel-list-container">
        <div className="channel-list-outer">
          <div className="mobile-row">
            {videos.map((item) => (
              <div key={item.id} className="mobile-col">
                <CardList></CardList>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelList;
