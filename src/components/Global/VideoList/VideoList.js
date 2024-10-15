import React, { useState } from "react";
import "./VideoList.css";
import { CardVideo } from "../Card/Card";
// import MainCarousel from "../Carousel/MainCarousel";
import Slider from "react-slick";
import { leftIcon, rightIcon } from "../SvgList/IconList";
import UseIconList from "../SvgList/UseIconList";

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
          icon={rightIcon}
          tag="chevron-right"
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
        <UseIconList
          width={54}
          height={54}
          icon={leftIcon}
          tag="chevron-left"
        ></UseIconList>
      </div>
    </>
  );
}

const VideoList = ({ categoryTitle, totalSlides = 12, slidesToShow = 3 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const lastSlide = totalSlides - slidesToShow;
  const settings = {
    dots: true,
    // centerMode: true,
    infinite: false,
    speed: 500,
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
            {videos.map((video) => (
              <CardVideo key={video.id} title={video.title} />
            ))}
            {/* <CardVideo></CardVideo> */}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default VideoList;
