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
} from "../../Global/Card/Card";
import VideoList from "../../Global/VideoList/VideoList";
import { UseResponsiveContext } from "../../../context/ResponsiveContext";
import { GetAllSort, GetDocumentsByQuery } from "../../../features/useFetch";
import { UseMyListContext } from "../../../context/MyListContext";
import BannerMobile from "../../Mobile/Global/Banner/Banner";

const AppBaner = () => {
  const { size } = UseResponsiveContext();
  const { isSwitcher } = UseToggleContext();
  const [isHovered, setIsHovered] = useState(false);
  const handleHovered = (opt) => {
    setIsHovered(opt);
  };

  // Category Data
  const [scheduleData, setScheduleData] = useState([]);
  const [scheLoading, setScheLoading] = useState(false);

  const handleCategoriesList = async () => {
    setScheLoading(true);
    const scheData = await GetDocumentsByQuery(
      "Videos",
      "privacy_status",
      "scheduled"
    );
    if (scheData.success) {
      setScheduleData(scheData.doc);
    }
    setScheLoading(false);
  };

  useEffect(() => {
    handleCategoriesList();
  }, []);

  return size.width < 992 ? (
    <BannerMobile data={scheduleData} isLoading={scheLoading} />
  ) : (
    <div className="banner-wrapper">
      {isSwitcher === 0 ? (
        <Banner
          data={scheduleData}
          isLoading={scheLoading}
          isHovered={isHovered}
          handleHovered={handleHovered}
        />
      ) : (
        <>
          <Sponsored
            data={scheduleData}
            isLoading={scheLoading}
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

  const { myList, isLoading: myListLoading } = UseMyListContext();

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
          myList?.length > 0 && (
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
            horizontal={false}
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
