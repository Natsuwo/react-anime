import React, { useEffect, useState } from "react";
import { GetDocumentsByQuery } from "../../../features/useFetch";
import VideoList from "../../Global/VideoList/VideoList";
import { CardRank } from "../../Global/Card/Card";

const CategoryRank = ({ category }) => {
  const [categoryRank, setCategoryRank] = useState([]);
  const [categoryRankLoading, setCategoryRankLoading] = useState(true);
  useEffect(() => {
    const handleData = async () => {
      if (category?.id && categoryRankLoading && Object.keys(category).length) {
        const data = await GetDocumentsByQuery(
          "Videos",
          "category_id",
          category?.category_id,
          true,
          20,
          true,
          "views_count",
          "desc"
        );
        if (data.success) {
          setCategoryRank(data.doc);
        }
        setCategoryRankLoading(false);
      }
    };
    handleData();
  }, [category, categoryRankLoading]);

  useEffect(() => {
    setCategoryRankLoading(true);
  }, [category]);

  return (
    <section className="feature-section">
      {category?.name && categoryRank?.length > 0 && (
        <VideoList
          categoryTitle={category?.name + " Rank"}
          ChildComponent={CardRank}
          items={categoryRank}
          slidesToShow={7}
          totalSlides={categoryRank?.length}
        ></VideoList>
      )}
    </section>
  );
};

export default CategoryRank;
