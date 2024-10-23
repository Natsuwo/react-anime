import React from "react";
import "./Sponsored.css";
import videotest from "../../../../assets/videos/trailer-1.mp4";
import OnLive from "../../../Global/Banner/Live/OnLive";
import LayoutSwitcher from "../../../Global/Banner/LayoutSwitcher/LayoutSwitcher";
import { UseToggleContext } from "../../../../context/ToggleContext";
import { CardList } from "../../../Global/Card/Card";

const Sponsored = () => {
  const { isSwitcher, handleSwitch } = UseToggleContext();
  return (
    <div className="sponsored-wrapper">
      <div className="sponsored-container">
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
              <video src={videotest}></video>
            </div>
          </div>
        </div>
      </div>
      <div className="card-zone-wrapper">
        <div className="control-wrapper">
          <OnLive></OnLive>
          <LayoutSwitcher
            handleSwitch={handleSwitch}
            isSwitcher={isSwitcher}
          ></LayoutSwitcher>
        </div>
      </div>
      <div className="list-wrapper">
        <div className="row">
          <CardList></CardList>
        </div>
        <div className="row">
          <CardList></CardList>
        </div>
        <div className="row">
          <CardList></CardList>
        </div>
        <div className="row">
          <CardList></CardList>
        </div>
        <div className="row">
          <CardList></CardList>
        </div>
        <div className="row">
          <CardList></CardList>
        </div>
        <div className="row">
          <CardList></CardList>
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
