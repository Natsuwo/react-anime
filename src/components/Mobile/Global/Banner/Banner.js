import React, { useEffect, useRef } from "react";
import "./Banner.css";
import OnLive from "../../../Global/Banner/Live/OnLive";
import UseIconList from "../../../Global/SvgList/UseIconList";
import { Link } from "react-router-dom";
import ChannelList from "../ChannelList/ChannelList";

const BannerMobile = ({ data, isLoading }) => {
  const currentIndexRef = useRef(0);
  const galleryImagesRef = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndexRef.current = (currentIndexRef.current + 1) % data?.length;
      galleryImagesRef.current.forEach((img, index) => {
        if (index === currentIndexRef.current) {
          img.classList.add("active");
        } else {
          img.classList.remove("active");
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [data]);

  return (
    <>
      <div className="mobile-banner-wrapper">
        <div className="mobile-banner-container">
          <div className="mobile-banner-outer">
            <div className="mobile-banner-image">
              <div className="mobile-banner-image-gallery">
                {data?.map((item, index) => (
                  <div
                    ref={(el) => (galleryImagesRef.current[index] = el)}
                    key={index}
                    data-id={index}
                    className={`mobile-banner-image-gallery-item${
                      index === currentIndexRef.current ? " active" : ""
                    }`}
                  >
                    <img
                      alt={`Image ${index + 1}`}
                      src={item.highlighted_thumbnail}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mobile-banner-details-wrapper">
              <div className="mobile-banner-details">
                <div className="mobile-onlive">
                  <OnLive />
                </div>
                <div className="mobile-banner-details-title">
                  <span>Interesting stuffs waiting for you!</span>
                </div>
                <div className="mobile-button-watch-wrapper">
                  <div className="mobile-watch-icon">
                    <UseIconList
                      width="24"
                      height="24"
                      icon="play"
                    ></UseIconList>
                  </div>

                  <button className="mobile-btn watch-now">
                    <Link
                      to={
                        data &&
                        data?.length > 0 &&
                        `/video/detail/${data[currentIndexRef.current].id}`
                      }
                    >
                      Watch now
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChannelList data={data} isLoading={isLoading}></ChannelList>
    </>
  );
};

export default BannerMobile;
