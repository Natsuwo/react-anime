import React, { useEffect, useState } from "react";
import UseIconList from "../../Global/SvgList/UseIconList";
import MainCarousel from "../../Global/Carousel/MainCarousel";
import { Link } from "react-router-dom";
import { GetDocumentsByQuery } from "../../../features/useFetch";

const CategoryTag = ({ category, slug }) => {
  const [arrtag, settag] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const handleData = async () => {
      if (!isLoading && Object.keys(category).length) {
        setLoading(true);
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
  }, [category, slug]);
  return (
    <section className="feature-section">
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
    </section>
  );
};

export default CategoryTag;
