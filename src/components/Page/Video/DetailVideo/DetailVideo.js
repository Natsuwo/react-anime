import React, { useEffect, useRef, useState } from "react";
import "./DetailVideo.css";
import UseIconList from "../../../Global/SvgList/UseIconList";
import EpisodeList from "./EpisodeList";
import Breadcumb from "../../../Global/Breadcrumb/Breadcumb";
import Recommend from "../../../Global/Recommend/Recommend";
import ActionButton from "../../../Global/ActionButton/ActionButton";
import SuggestedBar from "../../../Global/SuggestedBar/SuggestedBar";
import { UseResponsiveContext } from "../../../../context/ResponsiveContext";
import { useParams } from "react-router-dom";
import Skeleton from "../../../Global/Skeleton/Skeleton";
import {
  GetDocumentsByQuery,
  GetDocument,
} from "../../../../features/useFetch";

const DetailVideo = () => {
  const { videoId } = useParams();
  const descRef = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [oriHeight, setOriHeight] = useState(0);
  const { size } = UseResponsiveContext();

  const { value: data, loading: isLoading } = GetDocument("Videos", videoId);
  const { value: episodeListArr, loading: episodeListLoading } =
    GetDocumentsByQuery("Episode", "video_id", videoId);

  useEffect(() => {
    if (descRef.current) {
      setOriHeight(descRef.current.scrollHeight);
    }
  }, []);
  return (
    <main className="page-main">
      <div className="page-container">
        <div className="container__mobile">
          <Breadcumb />
        </div>
        <div className="detail-wrapper">
          {size.width > 991 ? (
            <div className="detail-container">
              <div className="detail-thumbnail">
                <div className="detail-thumbnail-container">
                  {!isLoading ? (
                    <img
                      src={data?.thumbnail_vertical_url}
                      alt={data?.title + " main thumbnail"}
                    />
                  ) : (
                    <Skeleton height={318} />
                  )}
                </div>
              </div>
              <div className="detail-infomation">
                <div className="detail-infomation-wrapper">
                  <h1 className="detail-main-title">{data?.title}</h1>
                  <div className="detail-tag">
                    {data?.tags?.slice().join(", ")}
                  </div>
                  <div
                    ref={descRef}
                    className={`detail-description${isShow ? " expanded" : ""}`}
                    style={{ maxHeight: isShow ? oriHeight : null }}
                  >
                    {data?.description}
                  </div>
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
                  <div className="detail-actions mb-md">
                    <ActionButton />
                  </div>
                  <SuggestedBar />
                </div>
              </div>
            </div>
          ) : (
            <div className="detail-wrapper__mobile">
              <div className="detail-background-overlay__mobile">
                <div
                  className="detail-thumbnail-background__mobile"
                  style={{
                    backgroundImage: `url(${data?.thumbnail_horizontal_url})`,
                  }}
                />
              </div>

              <div className="detail-content__mobile">
                <div className="detail-thumbnail__mobile">
                  <img src={data?.thumbnail_vertical_url} alt="Thumbnail" />
                </div>
                <div className="detail-information__mobile">
                  <h1 className="detail-main-title__mobile">{data?.title}</h1>
                  <div
                    className={`detail-description__mobile${
                      isShow ? " show" : ""
                    }`}
                  >
                    {data?.description}
                  </div>
                  <div className="detail-view-more__mobile">
                    <div
                      onClick={() => setIsShow(!isShow)}
                      className="view-more__mobile __text-active"
                    >
                      {isShow ? "View less" : "View more"}
                    </div>
                  </div>
                  <button className="btn btn-white __rarius-3 btn-icon-left my-auto">
                    <span className="btn-icon">
                      <UseIconList icon="play" />
                    </span>
                    <span className="btn-text">Watch now</span>
                  </button>
                  <div className="add-to-list-wrapper__mobile">
                    <span className="add-to-list-icon__mobile">
                      <UseIconList icon={"add"} />
                    </span>
                    <span className="add-to-list-text__mobile">MyList</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <EpisodeList value={episodeListArr} loading={episodeListLoading} />
        <div className="container__mobile">
          <div className="mt">
            <Recommend title={"Recent Category"} />
            <Recommend title={"Most Popular"} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailVideo;
