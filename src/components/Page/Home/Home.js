import React, { useEffect, useState } from "react";
import "./Home.css";
import Banner from "./Banner/Banner";
import Sponsored from "./Sponsored/Sponsored";
import { UseToggleContext } from "../../../context/ToggleContext";
import {
  CardVideo,
  CardRank,
  CardSquare,
  CardSkeleton,
  CardRankSkeleton,
  CardSquareSkeleton,
} from "../../Global/Card/Card";
import VideoList from "../../Global/VideoList/VideoList";
import { UseResponsiveContext } from "../../../context/ResponsiveContext";
import db from "../../../firebase";
import { collection, doc, getDocs, addDoc } from "firebase/firestore";
import Database from "../../../database";
import EpisodeData from "../../../DataEpisode";

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
  const collectionRef = collection(db, "Episode");
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([{}]);
  const items = [];
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collectionRef);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        items.push(data);
      });
      setData(items);
      setLoading(false);
      // EpisodeData.forEach(async (element) => {
      //   try {
      //     const docref = await addDoc(collectionRef, element);
      //     console.log("Document written with ID: ", docref.id, docref);
      //   } catch (err) {
      //     console.error(err);
      //   }
      // });
    };
    getData();
  }, []);
  return (
    <>
      <AppBaner />
      {/* Most Viewed */}
      {!isLoading ? (
        <VideoList
          categoryTitle={"Most viewed"}
          ChildComponent={CardVideo}
          items={data}
        ></VideoList>
      ) : (
        <VideoList
          categoryTitle={"Most viewed"}
          ChildComponent={CardSkeleton}
          height={222}
        ></VideoList>
      )}

      {/* CardVideo */}
      {/* <CardSkeleton /> */}
      {/* My List */}
      <VideoList
        categoryTitle={"My List"}
        ChildComponent={CardVideo}
        height={175}
        slidesToShow={4}
      ></VideoList>
      {/* OnGoing */}
      <VideoList
        categoryTitle={"On Going"}
        ChildComponent={CardVideo}
        slidesToShow={4}
        height={175}
      ></VideoList>
      {/* Card Rank */}
      {/* CardRank */}
      <VideoList
        categoryTitle={"Top Rank"}
        ChildComponent={CardRank}
        slidesToShow={7}
      ></VideoList>
      {/* Card Square */}
      {/* CardSquare */}
      <VideoList
        categoryTitle={"Sport"}
        ChildComponent={CardSquare}
        slidesToShow={8}
      ></VideoList>
    </>
  );
};

export default Home;
