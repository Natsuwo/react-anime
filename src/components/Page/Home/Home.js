import React, { useState } from "react";
import "./Home.css";
import Banner from "./Banner/Banner";
import Sponsored from "./Sponsored/Sponsored";
import { UseContext } from "../../../features/Context";
import VideoList from "../../Global/VideoList/VideoList";

const Home = () => {
  const { isSwitcher } = UseContext();
  const [isHovered, setIsHovered] = useState(false);

  const handleHovered = (opt) => {
    setIsHovered(opt);
  };

  return (
    <>
      <div className="banner-wrapper">
        {isSwitcher === 0 ? (
          <Banner isHovered={isHovered} handleHovered={handleHovered} />
        ) : (
          <Sponsored isHovered={isHovered} handleHovered={handleHovered} />
        )}
      </div>
      <VideoList categoryTitle={"Most viewed"}></VideoList>
      <VideoList categoryTitle={"My List"} slidesToShow={4}></VideoList>
      <VideoList categoryTitle={"On Going"} slidesToShow={4}></VideoList>
    </>
  );
};

export default Home;
