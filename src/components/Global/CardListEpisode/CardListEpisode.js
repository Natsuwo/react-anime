import React from "react";
import { Link } from "react-router-dom";
import UseIconList from "../SvgList/UseIconList";
import { getTime, formatViews } from "../../../features/helper";

const CardListEpsiode = ({
  showSupplements = true,
  showDesc = true,
  sidebar = false,
  data,
  playingId,
}) => {
  return (
    <>
      <li className="episode-list-item">
        <Link className="link-block" to={`/video/episode/${data?.id}`}>
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
              <img src={data?.thumbnail_url} alt="" />
            </div>
            <div className="episode-list-item-details">
              <div className="episode-list-item-title">
                <span
                  className="clamp-text"
                  style={{ WebkitLineClamp: sidebar ? 3 : 2 }}
                >
                  {data?.title}
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
            <div className="episode-list-item-add-to-list">
              <button className="add-to-list-btn">
                <span className="add-to-list-icon">
                  <UseIconList icon="add" />
                </span>
              </button>
            </div>
          </div>
        </Link>
      </li>
    </>
  );
};

export default CardListEpsiode;
