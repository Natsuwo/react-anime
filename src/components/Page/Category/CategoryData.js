import React, { useEffect, useState } from "react";
import { GetDocumentsByQuery } from "../../../features/useFetch";
import VideoList from "../../Global/VideoList/VideoList";
import { CardSkeleton, CardVideo } from "../../Global/Card/Card";

const CategoryData = ({ category, slug }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryDataLoading, setCategoryDataLoading] = useState(false);

  useEffect(() => {
    const handleData = async () => {
      if (!categoryDataLoading && Object.keys(category).length) {
        setCategoryDataLoading(true);
        const data = await GetDocumentsByQuery(
          "Videos",
          "category_id",
          category?.category_id,
          true
        );
        if (data.success) {
          setCategoryData(data.doc);
        }
        setCategoryDataLoading(false);
      }
    };
    handleData();
  }, [category, slug]);

  return (
    <section className="feature-section">
      {!categoryDataLoading ? (
        <VideoList ChildComponent={CardVideo} items={categoryData}></VideoList>
      ) : (
        <VideoList ChildComponent={CardSkeleton} height={215}></VideoList>
      )}
    </section>
  );
};

export default CategoryData;
