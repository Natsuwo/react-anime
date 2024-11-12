import React from "react";
import Slider from "react-slick";

const MainCarouselMobile = ({ isLoading = false, children }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: <></>,
    prevArrow: <></>,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>{children}</div>
      </Slider>
    </div>
  );
};

export default MainCarouselMobile;
