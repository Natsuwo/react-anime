import React from "react";
import { Link } from "react-router-dom";
import UseIconList from "../SvgList/UseIconList";
import { getTime, formatViews } from "../../../features/helper";
import Skeleton from "../Skeleton/Skeleton";
import { UseMyListContext } from "../../../context/MyListContext";
import Tooltip from "../Tooltip/Tooltip";

const CardListEpsiode = ({
  loading,
  showSupplements = true,
  showDesc = true,
  sidebar = false,
  data,
  playingId,
  mylist,
  onClick,
}) => {
  const { handleAddToList } = UseMyListContext();

  return (
    <>
      <li className="episode-list-item">
        <Link
          className="link-block"
          to={
            mylist ? `/video/detail/${data?.id}` : `/video/episode/${data?.id}`
          }
        >
          <div className="episode-list-item-wrapper">
            <div
              className={`episode-list-current-play${
                playingId && playingId === data?.id ? " active" : ""
              }`}
            >
              <span className="current-play-icon">
                <UseIconList icon="play" />
              </span>
            </div>
            <div className="episode-list-item-thumbnail">
              {loading ? (
                <Skeleton width={192} height={108}></Skeleton>
              ) : (
                <img
                  src={
                    data?.thumbnail_url
                      ? data?.thumbnail_url
                      : data?.highlighted_thumbnail
                  }
                  alt=""
                />
              )}
            </div>
            <div className="episode-list-item-details">
              <div className="episode-list-item-title">
                <span
                  className="clamp-text"
                  style={{ WebkitLineClamp: sidebar ? 3 : 2 }}
                >
                  {loading ? (
                    <>
                      <Skeleton width={90} height={7} borderRadius={"7px"} />
                      <Skeleton
                        customStyle={{ marginTop: "5px" }}
                        width={60}
                        height={7}
                        borderRadius={"7px"}
                      />
                    </>
                  ) : (
                    data?.title
                  )}
                </span>
              </div>
              {showSupplements && (
                <ul className="episode-list-item-info">
                  <li>{data?.duration / 60} minutes</li>
                  <li>{getTime(data?.last_modified_date)}</li>
                  <li>{formatViews(data?.views_count)} views</li>
                </ul>
              )}

              <div className="episode-list-item-tag">
                <div className="video-label">
                  <span className="label-text free">Free</span>
                </div>
              </div>
              {showDesc && (
                <div className="episode-list-item-desc">
                  <span className="clamp-text">{data?.description}</span>
                </div>
              )}
            </div>
            <div className="episode-list-item-add-to-list"></div>
          </div>
        </Link>
        {mylist && data ? (
          <div
            onClick={() => {
              handleAddToList(data?.id, data);
              onClick();
            }}
            className="add-to-list-btn-mylist"
          >
            <button className="add-to-list-btn-mylist-inner btn-tooltip">
              <Tooltip
                condition={true}
                textTrue={"Remove to My List"}
                textFalse={"Remove to My List"}
                position="right"
              />
              <span className="add-to-list-icon">
                <UseIconList icon="delete" />
              </span>
            </button>
          </div>
        ) : (
          <div className="add-to-list-btn-mylist">
            <button className="add-to-list-btn-mylist-inner btn-tooltip">
              <Tooltip
                condition={true}
                textTrue={"Add to My List"}
                textFalse={"Add to My List"}
                position="right"
              />
              <span className="add-to-list-icon">
                <UseIconList icon="add" />
              </span>
            </button>
          </div>
        )}
      </li>
    </>
  );
};

export default CardListEpsiode;
