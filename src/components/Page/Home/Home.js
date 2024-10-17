import React, { useState } from "react";
import "./Home.css";
import Banner from "./Banner/Banner";
import Sponsored from "./Sponsored/Sponsored";
import { UseToggleContext } from "../../../context/ToggleContext";
import { CardVideo, CardRank, CardSquare } from "../../Global/Card/Card";
import VideoList from "../../Global/VideoList/VideoList";
import { UseResponsiveContext } from "../../../context/ResponsiveContext";

const AppBaner = () => {
  const { size } = UseResponsiveContext();
  const { isSwitcher } = UseToggleContext();
  const [isHovered, setIsHovered] = useState(false);
  const handleHovered = (opt) => {
    setIsHovered(opt);
  };
  return size.width < 992 ? (
    ""
  ) : (
    <div className="banner-wrapper">
      {isSwitcher === 0 ? (
        <Banner isHovered={isHovered} handleHovered={handleHovered} />
      ) : (
        <>
          <Sponsored isHovered={isHovered} handleHovered={handleHovered} />
          {/* Set Gradient */}
          <div className="sponsored-overlay">
            <div className="sponsored-overlay-bg">
              <div className="sponsored-bg">
                <div className="background-color"></div>
                <div className="overlay"></div>
                <div className="gradition"></div>
              </div>
            </div>
            <div className="sponsored-bottom-gradition"></div>
          </div>
        </>
      )}
    </div>
  );
};

const Home = () => {
  return (
    <>
      <AppBaner />
      {/* Most Viewed */}
      <VideoList
        categoryTitle={"Most viewed"}
        ChildComponent={CardVideo}
      ></VideoList>
      {/* My List */}
      <VideoList
        categoryTitle={"My List"}
        ChildComponent={CardVideo}
        slidesToShow={4}
      ></VideoList>
      {/* OnGoing */}
      <VideoList
        categoryTitle={"On Going"}
        ChildComponent={CardVideo}
        slidesToShow={4}
      ></VideoList>
      {/* Card Rank */}
      <VideoList
        categoryTitle={"Top Rank"}
        ChildComponent={CardRank}
        slidesToShow={7}
      ></VideoList>
      {/* Card Square */}
      <VideoList
        categoryTitle={"Sport"}
        ChildComponent={CardSquare}
        slidesToShow={8}
      ></VideoList>
    </>
  );
};

export default Home;
