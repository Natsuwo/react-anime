import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import Banner from "./Banner/Banner";
import Sponsored from "./Sponsored/Sponsored";
import { UseToggleContext } from "../../../context/ToggleContext";
import {
  CardVideo,
  CardRank,
  // CardSquare,
  CardSkeleton,
} from "../../Global/Card/Card";
import VideoList from "../../Global/VideoList/VideoList";
import { UseResponsiveContext } from "../../../context/ResponsiveContext";
import {
  GetAllSort,
  GetDocumentsByQuery,
  getDoubleFind,
} from "../../../features/useFetch";
import { UseMyListContext } from "../../../context/MyListContext";
import BannerMobile from "../../Mobile/Global/Banner/Banner";

const AppBaner = () => {
  const { size } = UseResponsiveContext();
  const { isSwitcher } = UseToggleContext();

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
        <Banner data={scheduleData} isLoading={scheLoading} />
      ) : (
        <>
          <Sponsored data={scheduleData} isLoading={scheLoading} />
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
  const [actionData, setActionData] = useState([]);
  const [actionDataRank, setActionRank] = useState([]);
  const [freeAnimeData, setFreeAnime] = useState([]);
  const [premiumAnime, setPremiumAnime] = useState([]);
  const [dramaData, setDramaData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [musicData, setMusicData] = useState([]);
  const isLoadingAction = useRef(true);
  const [loading, setLoading] = useState({
    mostView: true,
    actionRank: true,
    freeAnime: true,
    premiumAnime: true,
    drama: true,
    news: true,
    music: true,
  });

  const { myList, isLoading: myListLoading } = UseMyListContext();

  useEffect(() => {
    const fetchData = async () => {
      const [
        mostViewRes,
        actionDataRes,
        actionRankRes,
        freeAnimeRes,
        premiumAnimeRes,
        dramaRes,
        newRes,
        musicRes,
      ] = await Promise.all([
        GetAllSort("Videos", "views_count", "desc", 12),
        GetDocumentsByQuery("Videos", "tags", "Action", true),
        GetDocumentsByQuery(
          "Videos",
          "tags",
          "Action",
          true,
          20,
          true,
          "views_count",
          "desc"
        ),
        getDoubleFind(
          "Episode",
          ["level", 1, false],
          ["category_id", [1, 2, 3], true],
          20
        ),
        getDoubleFind(
          "Episode",
          ["level", 2, false],
          ["category_id", [1, 2, 3], true],
          20
        ),
        GetDocumentsByQuery("Videos", "category_id", [4, 5], true),
        GetDocumentsByQuery("Episode", "category_id", 6, true),
        GetDocumentsByQuery("Episode", "category_id", 7, true),
      ]);

      if (mostViewRes.success) setMostViewData(mostViewRes.doc);
      if (actionDataRes.success) setActionData(actionDataRes.doc);
      if (actionRankRes.success) setActionRank(actionRankRes.doc);
      if (freeAnimeRes.success) setFreeAnime(freeAnimeRes.doc);
      if (premiumAnimeRes.success) setPremiumAnime(premiumAnimeRes.doc);
      if (dramaRes.success) setDramaData(dramaRes.doc);
      if (newRes.success) setNewsData(newRes.doc);
      if (musicRes.success) setMusicData(musicRes.doc);
      setLoading({
        mostView: !mostViewRes.success,
        actionRank: !actionRankRes.success,
        freeAnime: !freeAnimeRes.success,
        premiumAnime: !premiumAnimeRes.success,
        drama: !dramaRes.success,
        news: !newRes.success,
        music: !musicRes.success,
      });
      isLoadingAction.current = !actionDataRes.success;
    };

    fetchData();
  }, []);

  const renderVideoList = (
    title,
    data,
    isLoading,
    ChildComponent,
    slidesToShow = 4,
    totalSlides = null,
    height = 175,
    horizontal = true
  ) => (
    <VideoList
      categoryTitle={title}
      ChildComponent={isLoading ? CardSkeleton : ChildComponent}
      slidesToShow={slidesToShow}
      totalSlides={totalSlides ?? data?.length}
      items={isLoading ? [] : data}
      height={isLoading ? height : undefined}
      horizontal={horizontal}
    />
  );

  return (
    <>
      <AppBaner />
      <div className="home-container">
        {renderVideoList(
          "Most viewed",
          mostViewData,
          loading.mostView,
          CardVideo
        )}
        {renderVideoList(
          "Top Rank",
          mostViewData,
          loading.mostView,
          CardRank,
          7,
          mostViewData?.length,
          undefined,
          false
        )}
        {myListLoading
          ? renderVideoList("My List", [], true, CardSkeleton, 4, null, 175)
          : myList?.length > 0 &&
            renderVideoList(
              "My List",
              myList,
              false,
              CardVideo,
              4,
              myList.length
            )}
        {renderVideoList(
          "Action List",
          actionData,
          isLoadingAction.current,
          CardVideo
        )}
        {renderVideoList(
          "Action Rank",
          actionDataRank,
          loading.actionRank,
          CardRank,
          7,
          actionDataRank?.length,
          undefined,
          false
        )}
        {renderVideoList(
          "Free Anime",
          freeAnimeData,
          loading.freeAnime,
          CardVideo
        )}
        {premiumAnime?.length > 0 &&
          renderVideoList(
            "Premium Anime",
            premiumAnime,
            loading.premiumAnime,
            CardVideo
          )}

        {dramaData?.length > 0 &&
          renderVideoList("Drama", dramaData, loading.drama, CardVideo, 4)}
        {newsData?.length > 0 &&
          renderVideoList("News", newsData, loading.news, CardVideo, 4)}
        {musicData?.length > 0 &&
          renderVideoList("Music", musicData, loading.music, CardVideo, 4)}
      </div>
    </>
  );
};

export default Home;
