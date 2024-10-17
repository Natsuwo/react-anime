import React from "react";
import "./Home.css";
import VideoList from "../../../Global/VideoList/VideoList";
import { CardRank, CardSquare, CardVideo } from "../../../Global/Card/Card";
import Banner from "../../Global/Banner/Banner";

const Home = () => {
  return (
    <>
      <Banner />
      {/* Most Viewed */}
      <VideoList
        categoryTitle={"Most Viewed"}
        ChildComponent={CardVideo}
        slidesToShow={4}
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
