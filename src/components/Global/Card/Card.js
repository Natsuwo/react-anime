import React, { useEffect, useRef, useState } from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import UseIconList from "../SvgList/UseIconList";

export const CardSlide = ({ index, isActive, onCardClick }) => {
  return (
    <div
      onClick={() => onCardClick(index)}
      className={`main-card nobold${isActive ? " active" : ""}`}
    >
      <div className="card-overlay"></div>
      <div className="thumbnail">
        <img
          width="208"
          height="117"
          src="https://image.p-c2-x.abema-tv.com/media/channels/time/20241013035220/abema-anime.webp?height=288&quality=75&width=512"
          alt=""
        />
      </div>
      <div className="main-tag">
        <img
          width="146"
          height="55"
          src="https://image.p-c2-x.abema-tv.com/image/channels/abema-anime/logo.png?height=96&quality=75&version=20200413&width=256"
          alt=""
        />
      </div>
    </div>
  );
};

export const CardList = () => {
  return (
    <div className="card-list-wrapper">
      <div className="card-content">
        <div className="card-overlay"></div>
        <div className="thumbnail">
          <img
            width="208"
            height="117"
            src="https://image.p-c2-x.abema-tv.com/media/channels/time/20241013035220/abema-anime.webp?height=288&quality=75&width=512"
            alt=""
          />
        </div>
        <div className="main-tag">
          <img
            width="146"
            height="55"
            src="https://image.p-c2-x.abema-tv.com/image/channels/abema-anime/logo.png?height=96&quality=75&version=20200413&width=256"
            alt=""
          />
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
  video_id = 1,
  title,
  video_tags = {},
  is_live = false,
  date,
  is_new = false,
  role_tag = "",
}) => {
  return (
    <div className="video-card-wrapper">
      <Link
        to={`/video/detail/${video_id}`}
        className="link-block video-card"
        draggable="false"
      >
        <div className="video-card-thumbnail">
          {Object.keys(video_tags).length !== 0 &&
            video_tags.constructor === Object && (
              <div className="video-card-tags">
                <div className="card-tag-name">{video_tags.title}</div>
                <div className="card-tag-time">{video_tags.time}</div>
              </div>
            )}

          <img
            src="https://image.p-c2-x.abema-tv.com/image/creatives/2b645eac-3646-441e-a266-12d473e8c785/2b645eac-3646-441e-a266-12d473e8c785?background=000000&fit=fill&height=576&quality=75&width=1024"
            alt=""
          />
          {is_live && (
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
            {date && (
              <time
                className="video-release-date clamp-text"
                style={{ WebkitLineClamp: 1 }}
              >
                {date}
              </time>
            )}
            {is_new && (
              <div className="video-new-episode">
                <div className="video-new-episode-text">New Episode</div>
              </div>
            )}

            {role_tag && (
              <div className="video-label">
                <span className="label-text free">Free</span>
              </div>
            )}
          </div>
          <button className="video-card-action">
            <UseIconList width="24" height="24" icon={"add"}></UseIconList>
          </button>
        </div>
      </Link>
    </div>
  );
};

export const CardRank = ({ rank }) => {
  return (
    <div className="card-wrapper">
      <div className="card-rank-wrapper">
        <div className="card-rank-content">
          <div className="card-rank-text">
            <span className="rank-text">{rank}</span>
          </div>
          <Link className="card-rank link-block" to="#">
            <div className="card-rank-details">
              <div className="card-rank-thumbnail">
                <img
                  src="https://image.p-c2-x.abema-tv.com/image/creatives/50808e91-1d71-4134-a6e4-e91616ce6fc5/50808e91-1d71-4134-a6e4-e91616ce6fc5?height=546&quality=75&width=384"
                  alt=""
                />
                <div className="card-rank-tag">
                  <span
                    className="rank-tag-text clamp-text"
                    style={{ WebkitLineClamp: 1 }}
                  >
                    New Episode
                  </span>
                </div>
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
