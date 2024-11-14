import React, { useEffect, useState } from "react";
import UseIconList from "../../Global/SvgList/UseIconList";
import MainCarousel from "../../Global/Carousel/MainCarousel";
import { Link } from "react-router-dom";
import { GetDocumentsByQuery } from "../../../features/useFetch";
import { isMobile } from "react-device-detect";
import Slider from "react-slick";

const CategoryTag = ({ category }) => {
  const [arrtag, settag] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const handleData = async () => {
      if (isLoading && Object.keys(category).length) {
        const data = await GetDocumentsByQuery(
          "TagMeta",
          "category_id",
          category?.category_id,
          true
        );

        if (data.success) {
          settag(data.doc);
        }
        setLoading(false);
      }
    };
    handleData();
  }, [category, isLoading]);

  useEffect(() => {
    setLoading(true);
  }, [category]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    variableWidth: true,
    nextArrow: <></>,
    prevArrow: <></>,
  };
  return (
    <section className="feature-section">
      {isMobile && (
        <div className="slider-container">
          {arrtag.length >= 4 && (
            <Slider {...settings}>
              {arrtag.map((item, index) => (
                <div key={index}>
                  <Link to={`/tag/${item.id}`} className="tag-link">
                    <span className="tag-link-text">{item.name}</span>
                    <span className="tag-link-icon">
                      <UseIconList icon="chevron-right"></UseIconList>
                    </span>
                  </Link>
                </div>
              ))}
            </Slider>
          )}
          {arrtag.length < 4 && (
            <>
              {arrtag.map((item, index) => (
                <Link to={`/tag/${item.id}`} className="tag-link">
                  <span className="tag-link-text">{item.name}</span>
                  <span className="tag-link-icon">
                    <UseIconList icon="chevron-right"></UseIconList>
                  </span>
                </Link>
              ))}
            </>
          )}
        </div>
      )}
      {!isMobile && (
        <MainCarousel
          itemsPerPage={11}
          hiddenPage={true}
          data={arrtag}
          smallArrow={true}
        >
          <ul className="tag-list">
            {arrtag.map((item, index) => (
              <li key={index} className="tag-list-item __slide-zone">
                <Link to={`/tag/${item.id}`} className="tag-link">
                  <span className="tag-link-text">{item.name}</span>
                  <span className="tag-link-icon">
                    <UseIconList icon="chevron-right"></UseIconList>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </MainCarousel>
      )}
    </section>
  );
};

export default CategoryTag;
