import React, { useEffect, useRef } from "react";
import "./Banner.css";
import OnLive from "../../../Global/Banner/Live/OnLive";
import UseIconList from "../../../Global/SvgList/UseIconList";
import { Link } from "react-router-dom";
import ChannelList from "../ChannelList/ChannelList";

const Banner = () => {
  const arrBanner = [
    "https://image.p-c2-x.abema-tv.com/image/programs/89-102_s0_p28674/thumb001.png?height=307&quality=75&version=1727325243&width=512",
    "https://image.p-c2-x.abema-tv.com/image/programs/203-2_s1_p303/thumb001.png?height=307&quality=75&version=1684382153&width=512",
    "https://image.p-c2-x.abema-tv.com/image/programs/213-49_s1_p23/thumb001.png?height=307&quality=75&version=1722394189&width=512",
  ];

  const currentIndexRef = useRef(0);
  const galleryImagesRef = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndexRef.current =
        (currentIndexRef.current + 1) % arrBanner.length;
      galleryImagesRef.current.forEach((img, index) => {
        if (index === currentIndexRef.current) {
          img.classList.add("active");
        } else {
          img.classList.remove("active");
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="mobile-banner-wrapper">
        <div className="mobile-banner-container">
          <div className="mobile-banner-outer">
            <div className="mobile-banner-image">
              <div className="mobile-banner-image-gallery">
                {arrBanner.map((item, index) => (
                  <div
                    ref={(el) => (galleryImagesRef.current[index] = el)}
                    key={index}
                    data-id={index}
                    className={`mobile-banner-image-gallery-item${
                      index === currentIndexRef.current ? " active" : ""
                    }`}
                  >
                    <img alt={`Image ${index + 1}`} src={item} />
                  </div>
                ))}

                {/* <div className="banner-image-gallery-item">
                <img
                  src="https://image.p-c2-x.abema-tv.com/image/programs/203-2_s1_p303/thumb001.png?height=307&quality=75&version=1684382153&width=512"
                  alt=""
                />
              </div> */}
              </div>
            </div>
            <Link to="#" className="mobile-banner-details-wrapper">
              <div className="mobile-banner-details">
                <div className="mobile-onlive">
                  <OnLive />
                </div>
                <div className="mobile-banner-details-title">
                  <span>Hello world</span>
                </div>
                <div className="mobile-button-watch-wrapper">
                  <div className="mobile-watch-icon">
                    <UseIconList
                      width="24"
                      height="24"
                      icon="play"
                    ></UseIconList>
                  </div>
                  <button className="mobile-btn watch-now">Watch now</button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <ChannelList></ChannelList>
    </>
  );
};

export default Banner;
