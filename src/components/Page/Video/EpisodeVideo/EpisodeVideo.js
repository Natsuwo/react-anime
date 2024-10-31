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

const EpisodeVideo = () => {
  const descRef = useRef(null);
  const { episodeId } = useParams();
  const [isShow, setIsShow] = useState(false);
  const [oriHeight, setOriHeight] = useState(0);
  const { wideMode } = UsePlayerWide();

  const { value: data, loading: episodeLoading } = GetDocument(
    "Episode",
    episodeId
  );
  const { value: episodeListArr, loading: episodeListLoading } =
    GetDocumentsByQuery("Episode", "video_id", data?.video_id);

  const { value: mostViewData, loading: isLoadingMostView } = GetAllSort(
    "Videos",
    "views_count",
    "desc",
    12
  );

  useEffect(() => {
    if (descRef.current) {
      setOriHeight(descRef.current.scrollHeight);
    }
  }, []);

  const preLoadData = Array.from({ length: 12 }, (_, i) => ({ id: i + 1 }));
  return (
    <main className="page-main">
      <div className="page-container">
        <Breadcumb />
        <div className="episode-wrapper">
          <div className="episode-inner">
            <div className="player-wrapper">
              <Player url={data?.video_url} />
            </div>

            <h1 className="episode-main-title">
              {data?.season_title && (
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
                {data.title}
              </span>
            </h1>
            <div className="episode-supplement">
              <div className="supplement-item">
                {data?.duration / 60} minutes
              </div>
              <div className="supplement-item">
                {getTime(data?.last_modified_date)}
              </div>
              <div className="supplement-item">
                {formatViews(data?.views_count)} views
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
                {data?.description}
              </div>
              {data?.description && (
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
              <ActionButton />
            </div>
            <div className="recent-episode-wrapper mt">
              <EpisodeList
                playingId={episodeId}
                value={episodeListArr}
                loading={episodeListLoading}
              />
            </div>
          </div>
          {!wideMode && (
            <div className="episode-sidebar">
              <div className="episode-sidebar-inner">
                <h2 className="episode-sidebar-title mb-md">Popular Stuffs</h2>
                <ul className="episode-sidebar-ep-list">
                  {isLoadingMostView &&
                    preLoadData.map((item, index) => (
                      <CardListEpsiode
                        key={index}
                        sidebar={true}
                        loading={true}
                      />
                    ))}
                  {mostViewData.map((item, index) => (
                    <CardListEpsiode data={item} key={index} sidebar={true} />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="mt">
          <Recommend title={"Recent Category"} />
          <Recommend
            value={mostViewData}
            loading={isLoadingMostView}
            title={"Most Popular"}
          />
        </div>
      </div>
    </main>
  );
};

export default EpisodeVideo;
