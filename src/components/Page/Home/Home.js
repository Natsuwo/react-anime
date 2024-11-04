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
import {
  FetchMyList,
  GetAllSort,
  GetDocumentsByQuery,
} from "../../../features/useFetch";
import { UseMyListContext } from "../../../context/MyListContext";

import db from "../../../firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
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
  const { value: mostViewData, loading: isLoadingMostView } = GetAllSort(
    "Videos",
    "views_count",
    "desc",
    12
  );

  const { value: actionData, loading: isLoadingAcion } = GetDocumentsByQuery(
    "Videos",
    "tags",
    "Action",
    true
  );

  const { myList, dataMyList, isLoading: myListLoading } = UseMyListContext();

  // let testRun = false;
  // useEffect(() => {
  //   // console.log("chay");
  //   const getData = async () => {
  //     testRun = true;
  //     // const docRef = await addDoc(collection(db, "Episode"), EpisodeData[0]);
  //     Database.map(async (item) => {
  //       const docRef = await addDoc(collection(db, "Videos"), item);
  //       console.log("Document written with ID: ", docRef.id);
  //     });
  //   };

  //   if (!testRun) {
  //     console.log("chay");
  //     getData();
  //   }
  // }, []);
  return (
    <>
      <AppBaner />
      {/* Most Viewed */}
      {!isLoadingMostView ? (
        <VideoList
          categoryTitle={"Most viewed"}
          ChildComponent={CardVideo}
          items={mostViewData}
          totalSlides={mostViewData?.length}
        ></VideoList>
      ) : (
        <VideoList
          categoryTitle={"Most viewed"}
          ChildComponent={CardSkeleton}
          height={215}
        ></VideoList>
      )}

      {/* My List */}
      {myListLoading ? (
        <VideoList
          categoryTitle={"My List"}
          ChildComponent={CardSkeleton}
          slidesToShow={4}
          height={175}
        ></VideoList>
      ) : (
        dataMyList?.length > 0 && (
          <VideoList
            categoryTitle={"My List"}
            ChildComponent={CardVideo}
            slidesToShow={4}
            totalSlides={myList?.length}
            items={myList}
          ></VideoList>
        )
      )}

      {/* <VideoList
        categoryTitle={"My List"}
        ChildComponent={CardSkeleton}
        slidesToShow={4}
        height={175}
      ></VideoList> */}

      {/* Action */}
      {!isLoadingAcion ? (
        <VideoList
          categoryTitle={"Action List"}
          ChildComponent={CardVideo}
          slidesToShow={4}
          totalSlides={actionData?.length}
          items={actionData}
        ></VideoList>
      ) : (
        <VideoList
          categoryTitle={"Most viewed"}
          ChildComponent={CardSkeleton}
          slidesToShow={4}
          height={175}
        ></VideoList>
      )}

      {/* Card Rank */}
      {/* CardRank */}
      {!isLoadingMostView ? (
        <VideoList
          categoryTitle={"Top Rank"}
          ChildComponent={CardRank}
          slidesToShow={6}
          items={mostViewData}
          totalSlides={mostViewData?.length}
        ></VideoList>
      ) : (
        <VideoList
          categoryTitle={"Top Rank"}
          ChildComponent={CardRankSkeleton}
          slidesToShow={7}
          width={120}
          height={170}
        ></VideoList>
      )}
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
