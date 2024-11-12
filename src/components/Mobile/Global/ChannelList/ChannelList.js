import React from "react";
import "./ChannelList.css";
import CardList from "./CardList";

const ChannelList = ({ data, isLoading }) => {
  return (
    <div className="channel-list-wrapper">
      <div className="channel-list-container">
        <div className="channel-list-outer">
          <div className="mobile-row">
            {data?.map((item, index) => (
              <div key={index} className="mobile-col">
                <CardList props={item}></CardList>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelList;
