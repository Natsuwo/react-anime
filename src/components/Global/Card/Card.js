import React, { useEffect, useRef, useState } from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import UseIconList from "../SvgList/UseIconList";
import Skeleton from "../Skeleton/Skeleton";
import {
  formatDuration,
  formatLevelText,
  getDays,
  getTime,
} from "../../../features/helper";
import { UseMyListContext } from "../../../context/MyListContext";
import Tooltip from "../Tooltip/Tooltip";
import CategoryTag from "../CategoryTag/CategoryTag";
import { UseCategoryContext } from "../../../context/CategoryContext";

export const CardSlide = ({ index, isActive, onCardClick, props }) => {
  return (
    <div
      onClick={() => onCardClick(index)}
      className={`main-card nobold${isActive ? " active" : ""}`}
    >
      <div className="thumbnail">
        <Skeleton>
          <img
            width="208"
            height="117"
            src={props.highlighted_thumbnail}
            alt=""
          />
        </Skeleton>
      </div>
      <div className="card-overlay"></div>
      <div className="main-tag">
        <CategoryTag type={props?.category_name && props?.category_name} />
      </div>
    </div>
  );
};

export const CardList = ({ props }) => {
  return (
    <div className="card-list-wrapper">
      <div className="card-content">
        <div className="thumbnail">
          <Skeleton>
            <img
              width="208"
              height="117"
              src={props.highlighted_thumbnail}
              alt=""
            />
          </Skeleton>
        </div>
        <div className="card-overlay"></div>
        <div className="main-tag">
          <CategoryTag type={props?.category_name && props?.category_name} />
        </div>
      </div>
      <div className="watch-now-text">
        <UseIconList icon={"play"} />
        Watch now
      </div>
    </div>
  );
};

export const CardVideo = ({
  title,
  video_id = "1",
  thumbnail_url,
  highlighted_thumbnail,
  onClick,
  width,
  height,
  upload_date,
  last_modified_date,
  props,
  showTag = true,
  dominant_color,
}) => {
  const { addToList, handleAddToList } = UseMyListContext();
  const { categoryList } = UseCategoryContext();
  const [categoryName, setCategoryName] = useState("");
  const [isLive, setLive] = useState(false);
  const [isNew, setNew] = useState(false);

  const handleClick = async (e) => {
    e.stopPropagation();
    await handleAddToList(video_id, thumbnail_url ? "episodes" : "videos");
  };

  const handleCategory = () => {
    const newCate = categoryList?.filter(
      (item) => item.category_id === props?.category_id[0]
    );
    if (newCate.length) {
      setCategoryName(newCate[0].name);
    }
  };

  useEffect(() => {
    handleCategory();
  }, []);

  return (
    <div className="video-card-wrapper">
      <Link
        to={
          thumbnail_url
            ? `/video/episode/${video_id}`
            : `/video/detail/${video_id}`
        }
        className="link-block video-card"
        draggable="false"
        onClick={onClick}
      >
        <div className="video-card-thumbnail">
          {showTag && (
            <div
              className="video-card-tags"
              style={{
                "--dominant-color": dominant_color ? dominant_color : "#fb5607",
              }}
            >
              <div className="card-tag-name">{categoryName}</div>
              <div className="card-tag-time">
                {formatDuration(props?.duration)}
              </div>
            </div>
          )}
          <Skeleton>
            <img
              style={{ width, height }}
              src={
                highlighted_thumbnail ? highlighted_thumbnail : thumbnail_url
              }
              alt={`${title} thumbnail`}
            />
          </Skeleton>

          {isLive && (
            <div className="tag-on-thumb-wrapper">
              <span className="tag-on-thumb">
                <span className="tag-icon">
                  <UseIconList icon="onair" />
                </span>
                <div className="tag-text">On Live</div>
              </span>
            </div>
          )}
        </div>
        <div className="video-card-detail-container">
          <div className="video-card-detail">
            <div
              className="video-card-title clamp-text"
              style={{
                lineHeight: 1.5,
                maxHeight: "3em",
                WebkitLineClamp: 2,
              }}
            >
              {title}
            </div>
            {last_modified_date && (
              <time
                className="video-release-date clamp-text"
                style={{ WebkitLineClamp: 1 }}
              >
                {getTime(last_modified_date)}
              </time>
            )}

            {getDays(last_modified_date) < 10 && (
              <div className="video-new-episode">
                <div className="video-new-episode-text">New Episode</div>
              </div>
            )}

            {props?.level && (
              <div className="video-label">
                <span
                  className={`label-text${
                    props?.level === 2 ? " premium" : " free"
                  }`}
                >
                  {props?.level === 1 ? "Free" : "Premium"}
                </span>
              </div>
            )}
          </div>
          <div className="video-card-action-placeholder"></div>
        </div>
      </Link>
      <div className="main-add-to-list-btn">
        <button
          onClick={(e) => (addToList ? handleClick(e) : null)}
          className={`btn-tooltip main-add-to-list-inner${
            addToList && addToList[video_id] ? " added" : ""
          }`}
        >
          <Tooltip
            condition={addToList && addToList[video_id]}
            textTrue={"Remove to My List"}
            textFalse={"Add to My List"}
            position={"right"}
          />
          <span className="main-add-to-list-icon">
            <UseIconList
              width="24"
              height="24"
              icon={addToList && addToList[video_id] ? "done" : "add"}
            ></UseIconList>
          </span>
        </button>
      </div>
    </div>
  );
};

export const CardRank = ({
  rank,
  video_id,
  vertical_thumbnail,
  upload_date,
  onClick,
  width,
  height,
}) => {
  return (
    <div className="card-wrapper">
      <div className="card-rank-wrapper">
        <div className="card-rank-content">
          <div className="card-rank-text">
            <span className="rank-text">{rank}</span>
          </div>
          <Link
            onClick={onClick}
            className="card-rank link-block"
            to={`/video/detail/${video_id}`}
          >
            <div className="card-rank-details">
              <div className="card-rank-thumbnail">
                <Skeleton>
                  <img src={vertical_thumbnail} alt="" />
                </Skeleton>
                {getDays(upload_date) < 10 && (
                  <div className="card-rank-tag">
                    <span
                      className="rank-tag-text clamp-text"
                      style={{ WebkitLineClamp: 1 }}
                    >
                      New Episode
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const CardSquare = () => {
  const imgRef = useRef(null);
  const [leftOffset, setLeftOffset] = useState(0);
  const containerSize = 135;

  useEffect(() => {
    const divThumb = imgRef.current;
    if (divThumb) {
      const img = divThumb.querySelector("img");
      if (img) {
        const handleImageLoad = () => {
          const originalWidth = img.naturalWidth;
          const originalHeight = img.naturalHeight;

          // Tính toán tỉ lệ scale để ảnh vừa chiều cao div 135px
          const scale = containerSize / originalHeight;
          divThumb.style.width = `${originalWidth * scale}px`; // Đặt chiều rộng ảnh theo tỉ lệ mới
          divThumb.style.height = `${containerSize}px`; // Đặt chiều cao ảnh thành 135px

          // Tính toán căn giữa
          const calculatedLeftOffset =
            (containerSize - originalWidth * scale) / 2;
          setLeftOffset(calculatedLeftOffset); // Cập nhật leftOffset
        };

        // Gắn sự kiện load để xử lý khi ảnh đã tải xong
        img.addEventListener("load", handleImageLoad);
        // Dọn dẹp sự kiện khi component unmount
        return () => {
          img.removeEventListener("load", handleImageLoad);
        };
      }
    }
  }, []);
  return (
    <div className="card-wrapper">
      <Link to="#" className="card-square-wrapper link-block">
        <div className="card-square-content">
          <div
            className="card-square-thumbnail"
            style={{ width: containerSize, height: containerSize }}
          >
            <div className="card-square-thumbnail-inner">
              <div
                ref={imgRef}
                style={{
                  left: `${leftOffset}px`, // Áp dụng leftOffset tính toán được
                }}
                className="card-square-thumbnail-item"
              >
                <div className="thumbnail">
                  <img
                    src="https://image.p-c2-x.abema-tv.com/image/creatives/09e738cf-20fb-4c47-823a-fb40a2d8744a/09e738cf-20fb-4c47-823a-fb40a2d8744a?height=216&quality=75&width=384"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card-square-text">
            <span>MLB</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const CardSkeleton = ({ width, height }) => {
  return (
    <div className="video-card-wrapper">
      <div className="video-card-thumbnail">
        <Skeleton width={width} height={height} />
      </div>
      <div className="video-card-detail-container">
        <div className="video-card-detail">
          <Skeleton width={"90%"} height={"10px"} borderRadius={"20px"} />
          <Skeleton width={"30%"} height={"10px"} borderRadius={"20px"} />
          <Skeleton width={"10%"} height={"15px"} borderRadius={"6px"} />
        </div>
      </div>
    </div>
  );
};

export const CardRankSkeleton = ({ rank = 0 }) => {
  return (
    <div className="card-wrapper">
      <div className="card-rank-wrapper">
        <div className="card-rank-content">
          <div className="card-rank-text">
            <span className="rank-text">{rank}</span>
          </div>
          <div className="card-rank-details">
            <div className="card-rank-thumbnail">
              <Skeleton></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CardSquareSkeleton = () => {
  return (
    <div className="card-wrapper">
      <div className="card-square-content">
        <div className="card-square-thumbnail ">
          <Skeleton width={135} height={135} />
        </div>
      </div>
    </div>
  );
};
