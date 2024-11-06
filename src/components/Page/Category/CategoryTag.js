import React from "react";
import UseIconList from "../../Global/SvgList/UseIconList";
import MainCarousel from "../../Global/Carousel/MainCarousel";
import { Link } from "react-router-dom";

const CategoryTag = ({ category, slug }) => {
  const arrTag = Array.from({ length: 20 });
  return (
    <section className="feature-section">
      <MainCarousel
        itemsPerPage={11}
        hiddenPage={true}
        data={arrTag}
        smallArrow={true}
      >
        <ul className="tag-list">
          {arrTag.map((_, index) => (
            <li key={index} className="tag-list-item __slide-zone">
              <Link className="tag-link">
                <span className="tag-link-text">Tag {index}</span>
                <span className="tag-link-icon">
                  <UseIconList icon="chevron-right"></UseIconList>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </MainCarousel>
    </section>
  );
};

export default CategoryTag;
