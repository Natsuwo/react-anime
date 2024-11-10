import React, { useEffect, useMemo, useRef, useState } from "react";
import "./DetailVideo.css";
import UseIconList from "../../../Global/SvgList/UseIconList";
import EpisodeList from "./EpisodeList";
import Breadcumb from "../../../Global/Breadcrumb/Breadcumb";
import Recommend from "../../../Global/Recommend/Recommend";
import ActionButton from "../../../Global/ActionButton/ActionButton";
import SuggestedBar from "../../../Global/SuggestedBar/SuggestedBar";
import { UseResponsiveContext } from "../../../../context/ResponsiveContext";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../../../Global/Skeleton/Skeleton";
import {
  GetDocumentsByQuery,
  GetDocument,
  GetAllSort,
  fetchRandomWatchedEpisode,
} from "../../../../features/useFetch";
import CategoryData from "../../Category/CategoryData";
import { UseUserMetaContext } from "../../../../context/UserMeta";
import { UseMyListContext } from "../../../../context/MyListContext";
import { ReactComponent as CheckIcon } from "../../../../assets/images/icons/action/check_mobile.svg";
import { UseToastMyListContext } from "../../../../context/ToastMyListContext";

const DetailVideo = () => {
  const { videoId } = useParams();
  const descRef = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [oriHeight, setOriHeight] = useState(0);
  const { size } = UseResponsiveContext();
  const { user } = UseUserMetaContext();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [mostViewData, setMostViewData] = useState([]);
  const [isLoadingMostView, setLoadingMostView] = useState(false);

  const [initialWatchTime, setInitialWatchTime] = useState(null);

  const { addToList, handleAddToList } = UseMyListContext();

  const [episodeListArr, setEpisodeList] = useState([]);
  const [episodeListLoading, setElistLoading] = useState(true);

  const linkTo = initialWatchTime
    ? initialWatchTime?.episodeId
    : episodeListArr.length
    ? episodeListArr[0].id
    : "";

  const { handleToast, handleToastCondition } = UseToastMyListContext();

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

  const handleData = async () => {
    setLoading(true);
    const res = await GetDocument("Videos", videoId);
    if (res.success) {
      setData(res.docs);
    } else {
      console.error(res.error);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleData();
  }, [videoId]);

  useEffect(() => {
    if (user?.uid && videoId) {
      (async () => {
        const data = await fetchRandomWatchedEpisode(user.uid, videoId);
        setInitialWatchTime(data);
      })();
    }
  }, [user, videoId]);

  useEffect(() => {
    const handleDataQuery = async () => {
      const data = await GetDocumentsByQuery("Episode", "video_id", videoId);
      if (data.success) {
        setEpisodeList(data.doc);
      }
      setElistLoading(false);
    };

    handleDataQuery();
  }, [videoId]);

  useEffect(() => {
    if (data && descRef.current) {
      setOriHeight(descRef.current.scrollHeight);
    }
  }, [data]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [videoId]);

  const breadcrumb = [{ title: data.title }];

  const handleAddToListClick = async (e) => {
    e.stopPropagation();
    await handleAddToList(data?.id, "videos", "detail");
    handleToast(true);
  };

  const isAddedToList = useMemo(
    () => !!addToList?.videos?.[data?.id],
    [addToList, data?.id]
  );

  useEffect(() => {
    if (isAddedToList) {
      handleToastCondition(true);
    } else {
      handleToastCondition(false);
    }
  }, [isAddedToList]);

  return (
    <main className="page-main">
      <div className="page-container">
        <div className="container__mobile">
          <Breadcumb items={breadcrumb} />
        </div>
        <div className="detail-wrapper">
          {size.width > 991 ? (
            <div className="detail-container">
              <div className="detail-thumbnail">
                <div className="detail-thumbnail-container">
                  <Skeleton horizontal={false}>
                    {data?.thumbnail_vertical_url && (
                      <img
                        src={data?.thumbnail_vertical_url}
                        alt={data?.title + " main thumbnail"}
                      />
                    )}
                  </Skeleton>
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
                    <ActionButton items={data} />
                  </div>
                  {initialWatchTime && (
                    <SuggestedBar
                      episodeListArr={episodeListArr}
                      initialWatchTime={initialWatchTime}
                    />
                  )}
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
                  <Skeleton horizontal={false}>
                    <img
                      src={data?.thumbnail_vertical_url}
                      alt={data?.title ? data?.title + " thumbnail" : ""}
                    />
                  </Skeleton>
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
                  {episodeListArr.length && (
                    <Link
                      style={{ display: "flex" }}
                      to={`/video/episode/${linkTo}`}
                    >
                      <button
                        style={{ width: "100%" }}
                        className="btn btn-white __rarius-3 btn-icon-left my-auto"
                      >
                        <span className="btn-icon">
                          <UseIconList icon="play" />
                        </span>

                        <span className="btn-text">Watch now</span>
                      </button>
                    </Link>
                  )}

                  <div className="add-to-list-wrapper__mobile">
                    <button
                      onClick={(e) =>
                        addToList ? handleAddToListClick(e) : null
                      }
                      className={`add-to-list-icon__mobile add-to-list${
                        isAddedToList ? " added" : ""
                      }`}
                    >
                      {isAddedToList ? (
                        <CheckIcon />
                      ) : (
                        <UseIconList icon="add" />
                      )}
                    </button>
                    <span className="add-to-list-text__mobile">MyList</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {episodeListLoading ? (
          <Skeleton width="100%" height={250} />
        ) : (
          <EpisodeList
            value={episodeListArr}
            loading={episodeListLoading.current}
          />
        )}
        <div className="container__mobile">
          <div className="mt">
            <CategoryData
              title={"Category"}
              isGrid={true}
              category={data}
              slug={videoId}
            />
            <Recommend
              value={mostViewData}
              loading={isLoadingMostView}
              title={"Most Popular"}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailVideo;
