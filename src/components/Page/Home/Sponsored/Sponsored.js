import React from "react";
import "./Sponsored.css";
import OnLive from "../../../Global/Banner/Live/OnLive";
import LayoutSwitcher from "../../../Global/Banner/LayoutSwitcher/LayoutSwitcher";
import { UseToggleContext } from "../../../../context/ToggleContext";
import { CardList } from "../../../Global/Card/Card";
import Skeleton from "../../../Global/Skeleton/Skeleton";
import SponsoredContainer from "./SponsoredContainer";

const Sponsored = ({ data, isLoading }) => {
  const { isSwitcher, handleSwitch } = UseToggleContext();

  const defaultArr = Array.from({ length: 12 }, (_, i) => ({
    id: i,
  }));

  return (
    <div className="sponsored-wrapper">
      <SponsoredContainer
        handleVastLoaded={() => {}}
        handleVastRun={() => {}}
        repeat={true}
      />
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
        {isLoading && (
          <>
            {defaultArr.map((item, index) => (
              <div key={index} className="row">
                <Skeleton width={"100%"} height={117} />
              </div>
            ))}
          </>
        )}

        {data?.map((item, index) => (
          <div key={index + item.id} className="row">
            <CardList props={item}></CardList>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsored;
