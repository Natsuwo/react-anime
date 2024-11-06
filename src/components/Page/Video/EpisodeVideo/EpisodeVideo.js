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
} from "../../../../features/useFetch";
import { getTime, formatViews } from "../../../../features/helper";
import CategoryData from "../../Category/CategoryData";

const EpisodeVideo = () => {
  const descRef = useRef(null);
  const { episodeId } = useParams();
  const [isShow, setIsShow] = useState(false);
  const [oriHeight, setOriHeight] = useState(0);
  const { wideMode } = UsePlayerWide();

  const { value: dataEpisode, loading: episodeLoading } = GetDocument(
    "Episode",
    episodeId
  );

  const { value: mostViewData, loading: isLoadingMostView } = GetAllSort(
    "Videos",
    "views_count",
    "desc",
    12
  );

  const { value: mostViewSidebar, loading: loadingSidebar } = GetAllSort(
    "Episode",
    "views_count",
    "desc",
    12
  );

  const [episodeListArr, setEpisodeList] = useState([]);
  const episodeListLoading = useRef(false);

  useEffect(() => {
    const handleData = async () => {
      if (dataEpisode && !episodeListLoading.current) {
        episodeListLoading.current = true;
        const data = await GetDocumentsByQuery(
          "Episode",
          "video_id",
          dataEpisode?.video_id
        );
        if (data.success) {
          setEpisodeList(data.doc);
        }
        episodeListLoading.current = false;
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
  return (
    <main className="page-main">
      <div className="episode-main-content">
        <div className="episode-main-container">
          <div className="episode-main-inner">
            <Breadcumb />
            <div className="episode-wrapper">
              <div className="episode-inner">
                <div className="player-wrapper">
                  <Player url={dataEpisode?.video_url} />
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
                      {mostViewSidebar.map((item, index) => (
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
