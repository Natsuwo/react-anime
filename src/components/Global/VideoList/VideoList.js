import React, { useState } from "react";
import "./VideoList.css";
import Slider from "react-slick";
import UseIconList from "../SvgList/UseIconList";
import {
  fourCardResponsive,
  eightCardResponsive,
  sevenCardResponsive,
} from "../../Page/Home/CardReponsive";

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
  ChildComponent,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const lastSlide = totalSlides - slidesToShow;
  const settings = {
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
    slidesToScroll: slidesToShow,
    afterChange: (index) => setCurrentSlide(index),
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
  const videos = Array.from({ length: totalSlides }, (_, i) => ({
    id: i,
    title: `Video ${i + 1}`,
  }));

  return (
    <div className="video-list-wrapper">
      <div className="video-list-content">
        <div className="container mt">
          <div className="video-list-category-title">
            <h2>{categoryTitle}</h2>
          </div>
        </div>
        <div className="flex-container">
          <Slider {...settings}>
            {videos.map((video, index) => (
              <ChildComponent
                video_id={video.id + 1}
                key={video.id}
                rank={video.id + 1}
                title={video.title}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default VideoList;
