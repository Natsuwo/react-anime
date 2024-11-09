import React, { useEffect, useRef, useState } from "react";
import "./VideoList.css";
import Slider from "react-slick";
import UseIconList from "../SvgList/UseIconList";
import {
  fourCardResponsive,
  eightCardResponsive,
  sevenCardResponsive,
} from "../../Page/Home/CardReponsive";
import Skeleton from "../Skeleton/Skeleton";

function NextArrow(props) {
  const { style, onClick, state } = props;
  // have props className
  return (
    <>
      <div className="gradient gradient-right"></div>
      <div
        className="arrow-icon right"
        style={{ ...style, display: state ? "none" : "block" }}
        onClick={onClick}
      >
        <UseIconList
          width={54}
          height={54}
          icon={"chevron-right"}
        ></UseIconList>
      </div>
    </>
  );
}

function PrevArrow(props) {
  const { style, onClick, state } = props;
  return (
    <>
      <div className={`gradient gradient-left${state ? " hidden" : ""}`}></div>
      <div
        className="arrow-icon left"
        style={{ ...style, display: state ? "none" : "block" }}
        onClick={onClick}
      >
        <UseIconList width={54} height={54} icon={"chevron-left"}></UseIconList>
      </div>
    </>
  );
}
const VideoList = ({
  categoryTitle,
  totalSlides = 12,
  slidesToShow = 3,
  slidesToScroll,
  ChildComponent,
  width,
  height,
  items = [],
  isLoading = true,
  horizontal,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const defaultArr = Array.from({ length: 4 });
  const cardRefs = useRef([]);

  const handleBeforeChange = () => {
    setIsScrolling(true);
  };

  const handleAfterChange = () => {
    setIsScrolling(false);
  };

  const handleLinkClick = (e) => {
    if (isScrolling) {
      e.preventDefault(); // Chặn hành vi chuyển trang
    }
  };

  const lastSlide = totalSlides - slidesToShow;
  const settings = {
    beforeChange: handleBeforeChange,
    dots: true,
    // centerMode: true,
    infinite: false,
    speed: 500,
    responsive:
      slidesToShow < 5
        ? fourCardResponsive
        : slidesToShow < 8
        ? sevenCardResponsive
        : eightCardResponsive || [],
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll ? slidesToScroll : slidesToShow,
    afterChange: (index) => {
      handleAfterChange();
      setCurrentSlide(index);
    },
    nextArrow:
      currentSlide >= lastSlide ? (
        <NextArrow state={true} />
      ) : (
        <NextArrow state={false} />
      ),
    prevArrow:
      currentSlide === 0 ? (
        <PrevArrow state={true} />
      ) : (
        <PrevArrow state={false} />
      ),
  };

  useEffect(() => {
    const validCards = cardRefs.current.filter((card) => card); // Lọc các phần tử null/undefined
    const maxHeight = Math.max(...validCards.map((card) => card.offsetHeight));

    validCards.forEach((card) => {
      card.style.height = `${maxHeight}px`;
    });
  }, [items]);
  return (
    <div className="video-list-wrapper">
      <div className="video-list-content">
        <div className="container mt">
          <div className="video-list-category-title">
            {categoryTitle && <h2>{categoryTitle}</h2>}
          </div>
        </div>
        {isLoading && items.length === 0 && (
          <div className="flex-container-less-wrapper">
            {defaultArr.map((_, index) => (
              <div className="flex-container-less-item" key={index}>
                <Skeleton horizontal={horizontal}></Skeleton>
              </div>
            ))}
          </div>
        )}

        {items.length > 4 && (
          <div className="flex-container">
            <Slider {...settings}>
              {items.map((video, index) => (
                <div key={index} ref={(el) => (cardRefs.current[index] = el)}>
                  <ChildComponent
                    onClick={handleLinkClick}
                    width={width}
                    height={height}
                    video_id={video.id}
                    thumbnail_url={video.thumbnail_url}
                    highlighted_thumbnail={video.highlighted_thumbnail}
                    vertical_thumbnail={video.thumbnail_vertical_url}
                    horizontal_thumbnail={video.thumbnail_horizontal_url}
                    last_modified_date={video.last_modified_date}
                    upload_date={video.upload_date}
                    url={video.video_url}
                    rank={index + 1}
                    title={video.title}
                    props={video}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}
        {items.length <= 4 && (
          <div className="flex-container-less-wrapper">
            {items.map((video, index) => (
              <div className="flex-container-less-item" key={index}>
                <ChildComponent
                  onClick={handleLinkClick}
                  width={width}
                  height={height}
                  video_id={video.id}
                  key={index}
                  thumbnail_url={video.thumbnail_url}
                  highlighted_thumbnail={video.highlighted_thumbnail}
                  vertical_thumbnail={video.thumbnail_vertical_url}
                  horizontal_thumbnail={video.thumbnail_horizontal_url}
                  last_modified_date={video.last_modified_date}
                  upload_date={video.upload_date}
                  url={video.video_url}
                  rank={index + 1}
                  title={video.title}
                  props={video}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoList;
