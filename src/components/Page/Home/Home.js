import React, { useEffect, useRef, useState } from "react";
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
  FetchSingleDocumentByKey,
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
import { UseCategoryContext } from "../../../context/CategoryContext";

const AppBaner = () => {
  const { size } = UseResponsiveContext();
  const { isSwitcher } = UseToggleContext();
  const [isHovered, setIsHovered] = useState(false);
  const handleHovered = (opt) => {
    setIsHovered(opt);
  };

  // Category Data
  const [categoryData, setCategoryData] = useState([]);
  const [cateLoading, setCateLoading] = useState(false);
  const { categoryList } = UseCategoryContext();

  const handleCategoriesList = async () => {
    setCateLoading(true);
    categoryList?.map(async (item) => {
      const data = await FetchSingleDocumentByKey(
        "Videos",
        "category_id",
        item.category_id,
        true
      );
      const dataWithCategory = { ...data, category_name: item.category_id };
      setCategoryData((prev) => {
        if (
          !prev.some(
            (existingItem) => existingItem.category_name === item.category_id
          )
        ) {
          return [...prev, dataWithCategory];
        }
        return prev;
      });
      setCateLoading(false);
    });
  };

  useEffect(() => {
    if (categoryList?.length > 0) {
      handleCategoriesList();
    }
  }, [categoryList]);
  return size.width < 992 ? (
    ""
  ) : (
    <div className="banner-wrapper">
      {isSwitcher === 0 ? (
        <Banner
          categoryData={categoryData}
          isLoading={cateLoading}
          isHovered={isHovered}
          handleHovered={handleHovered}
        />
      ) : (
        <>
          <Sponsored
            categoryData={categoryData}
            isLoading={cateLoading}
            isHovered={isHovered}
            handleHovered={handleHovered}
          />
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
  const [mostViewData, setMostViewData] = useState([]);
  const [isLoadingMostView, setLoadingMostView] = useState(false);

  const [actionData, setActionData] = useState([]);
  const isLoadingAction = useRef(true);

  useEffect(() => {
    (async () => {
      setLoadingMostView(true);
      const data = await GetAllSort("Videos", "views_count", "desc", 12);
      if (data.success) {
        setMostViewData(data.doc);
      } else {
        console.error(data.error);
      }
      setLoadingMostView(false);
    })();
  }, []);

  useEffect(() => {
    const handleActionData = async () => {
      const data = await GetDocumentsByQuery("Videos", "tags", "Action", true);
      if (data.success) {
        setActionData(data.doc);
      }
      isLoadingAction.current = false;
    };
    handleActionData();
  }, []);

  const { myList, dataMyList, isLoading: myListLoading } = UseMyListContext();

  // let testRun = false;
  // useEffect(() => {
  //   const getData = async () => {
  //     testRun = true;
  //     // const docRef = await addDoc(collection(db, "Episode"), EpisodeData[0]);
  //     Database.map(async (item) => {
  //       const docRef = await addDoc(collection(db, "Videos"), item);
  //       console.log("Document written with ID: ", docRef.id);
  //     });
  //   };

  //   if (!testRun) {
  //     getData();
  //   }
  // }, []);
  return (
    <>
      <AppBaner />
      <div className="home-container">
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

        {/* Action */}
        {!isLoadingAction.current ? (
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
        {mostViewData && (
          <VideoList
            categoryTitle={"Top Rank"}
            ChildComponent={CardRank}
            slidesToShow={7}
            items={mostViewData}
            totalSlides={mostViewData?.length}
            isLoading={isLoadingMostView}
          ></VideoList>
        )}
        {/* Card Square */}
        {/* CardSquare */}
        <VideoList
          categoryTitle={"Sport"}
          ChildComponent={CardSquare}
          slidesToShow={8}
          isLoading={false}
        ></VideoList>
      </div>
    </>
  );
};

export default Home;
