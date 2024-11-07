import React, { useEffect, useRef, useState } from "react";
import "./EpisodeVideo.css";
import Breadcumb from "../../../Global/Breadcrumb/Breadcumb";
import ActionButton from "../../../Global/ActionButton/ActionButton";
import UseIconList from "../../../Global/SvgList/UseIconList";
import CardListEpsiode from "../../../Global/CardListEpisode/CardListEpisode";
import EpisodeList from "../DetailVideo/EpisodeList";
import Recommend from "../../../Global/Recommend/Recommend";
import Player from "../../../Global/Player/Player";
import { UsePlayerWide } from "../../../../context/PlayerWideContext";
import { useParams } from "react-router-dom";
import {
  GetDocument,
  GetDocumentsByQuery,
  GetAllSort,
  fetchWatchTime,
} from "../../../../features/useFetch";
import Skeleton from "../../../Global/Skeleton/Skeleton";
import CategoryData from "../../Category/CategoryData";
import { getTime, formatViews } from "../../../../features/helper";
import { UseCategoryContext } from "../../../../context/CategoryContext";
import { UseUserMetaContext } from "../../../../context/UserMeta";

const EpisodeVideo = () => {
  const descRef = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [oriHeight, setOriHeight] = useState(0);
  const [breadcrumb, setBreadCrumb] = useState([]);
  const { episodeId } = useParams();
  const { wideMode } = UsePlayerWide();
  const { categoryList } = UseCategoryContext();
  const { user } = UseUserMetaContext();

  const [mostViewData, setMostViewData] = useState([]);
  const [isLoadingMostView, setLoadingMostView] = useState(false);

  const [mostViewSidebar, setMostViewSidebar] = useState([]);
  const [loadingSidebar, setLoadingSidebar] = useState(false);

  const [dataEpisode, setDataEpisode] = useState({});
  const [dataVideo, setDataVideo] = useState({});
  const [isLoading, setLoading] = useState(false);

  const [episodeListArr, setEpisodeList] = useState([]);
  const [episodeListLoading, setEpisodeListLoading] = useState(false);

  // time saved
  const [initialWatchTime, setInitialWatchTime] = useState(null);

  const handleData = async () => {
    setLoading(true);
    const res = await GetDocument("Episode", episodeId);
    if (res.success) {
      setDataEpisode(res.docs);
    } else {
      console.error(res.error);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleData();
  }, [episodeId]);

  const handleDataVideo = async () => {
    if (Object.keys(dataEpisode).length && dataEpisode.video_id) {
      const resVideo = await GetDocument("Videos", dataEpisode.video_id);
      if (resVideo.success) {
        setDataVideo(resVideo.docs);
      } else {
        console.error(resVideo.error);
      }
    }
  };

  useEffect(() => {
    handleDataVideo();
  }, [dataEpisode]);

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
  }, [episodeId]);

  useEffect(() => {
    (async () => {
      setLoadingSidebar(true);
      const data = await GetAllSort("Episode", "views_count", "desc", 12);

      if (data.success) {
        setMostViewSidebar(data.doc);
      } else {
        console.error(data.error);
      }
      setLoadingSidebar(false);
    })();
  }, [episodeId]);

  useEffect(() => {
    if (Object.keys(dataEpisode).length && Object.keys(dataVideo).length) {
      const filteredItems = categoryList.filter((item) =>
        dataEpisode.category_id.includes(item.category_id)
      );

      const breadcrumbItems = [
        { title: dataVideo.title, url: "/video/detail/" + dataVideo.id },
      ];

      filteredItems.map((item) =>
        breadcrumbItems.push({ title: item.name, url: "/genre/" + item.slug })
      );

      breadcrumbItems.push({ title: dataEpisode.title });

      setBreadCrumb(breadcrumbItems);
    }
  }, [dataVideo]);

  useEffect(() => {
    const handleData = async () => {
      if (Object.keys(dataEpisode).length && !episodeListLoading) {
        setEpisodeListLoading(true);
        const data = await GetDocumentsByQuery(
          "Episode",
          "video_id",
          dataEpisode?.video_id
        );
        if (data.success) {
          setEpisodeList(data.doc);
        }
        setEpisodeListLoading(false);
      }
    };

    handleData();
  }, [dataEpisode]);

  useEffect(() => {
    if (dataEpisode && descRef.current) {
      setOriHeight(descRef.current.scrollHeight);
    }
  }, [dataEpisode]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [episodeId]);

  const preLoadData = Array.from({ length: 12 }, (_, i) => ({ id: i + 1 }));

  useEffect(() => {
    if (episodeId && user?.uid && dataEpisode?.video_id) {
      (async () => {
        const time = await fetchWatchTime(
          user.uid,
          dataEpisode?.video_id,
          episodeId
        );
        setInitialWatchTime(time || 0);
      })();
    }
  }, [user?.uid, episodeId, dataEpisode?.video_id]);

  return (
    <main className="page-main">
      <div className="episode-main-content">
        <div className="episode-main-container">
          <div className="episode-main-inner">
            <Breadcumb items={breadcrumb} />
            <div className="episode-wrapper">
              <div className="episode-inner">
                <div className="player-wrapper">
                  {isLoading && <Skeleton></Skeleton>}
                  {!isLoading && initialWatchTime !== null && (
                    <Player
                      userId={user?.uid}
                      videoId={dataEpisode?.video_id}
                      episodeId={episodeId}
                      url={dataEpisode?.video_url}
                      initialWatchTime={initialWatchTime}
                    />
                  )}
                </div>

                <h1 className="episode-main-title">
                  {dataEpisode?.season_title && (
                    <span
                      className="season-title clamp-text"
                      style={{ WebkitLineClamp: 1 }}
                    >
                      吸血鬼すぐ死ぬ
                    </span>
                  )}
                  <span
                    className="episode-title clamp-text"
                    style={{ WebkitLineClamp: 1 }}
                  >
                    {dataEpisode.title}
                  </span>
                </h1>
                <div className="episode-supplement">
                  <div className="supplement-item">
                    {dataEpisode?.duration / 60} minutes
                  </div>
                  <div className="supplement-item">
                    {getTime(dataEpisode?.last_modified_date)}
                  </div>
                  <div className="supplement-item">
                    {formatViews(dataEpisode?.views_count)} views
                  </div>
                </div>
                <div className="episode-tag">
                  <div className="video-label">
                    <span className="label-text free">Free</span>
                  </div>
                </div>
                <div className="episode-desc-wrapper">
                  <div
                    ref={descRef}
                    className={`detail-description${isShow ? " expanded" : ""}`}
                    style={{ maxHeight: isShow ? oriHeight : null }}
                  >
                    {dataEpisode?.description}
                  </div>
                  {dataEpisode?.description && (
                    <button
                      onClick={() => setIsShow(!isShow)}
                      className="detail-toggle btn-default"
                    >
                      <span className="detail-toggle-icon">
                        <UseIconList
                          icon={isShow ? "dropup" : "dropdown"}
                        ></UseIconList>
                      </span>
                      <span className="detail-toggle-text">More Detail</span>
                    </button>
                  )}
                </div>
                <div className="episode-action">
                  <ActionButton items={dataEpisode} />
                </div>
                <div className="recent-episode-wrapper mt">
                  <EpisodeList
                    playingId={episodeId}
                    value={episodeListArr}
                    loading={episodeListLoading.current}
                  />
                </div>
              </div>
              {!wideMode && (
                <div className="episode-sidebar">
                  <div className="episode-sidebar-inner">
                    <h2 className="episode-sidebar-title mb-md">
                      Popular Stuffs
                    </h2>
                    <ul className="episode-sidebar-ep-list">
                      {loadingSidebar &&
                        preLoadData.map((item, index) => (
                          <CardListEpsiode
                            key={index}
                            sidebar={true}
                            loading={true}
                          />
                        ))}
                      {mostViewSidebar.length > 0 &&
                        mostViewSidebar.map((item, index) => (
                          <CardListEpsiode
                            data={item}
                            key={index}
                            sidebar={true}
                          />
                        ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div className="mt">
              <CategoryData
                title={"Recent Category"}
                isGrid={true}
                category={dataEpisode}
                slug={episodeId}
              />
              <Recommend
                value={mostViewData}
                loading={isLoadingMostView}
                title={"Most Popular"}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EpisodeVideo;
