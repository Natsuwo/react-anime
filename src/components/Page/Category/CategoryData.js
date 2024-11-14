import React, { useEffect, useState } from "react";
import { GetDocumentsByQuery } from "../../../features/useFetch";
import VideoList from "../../Global/VideoList/VideoList";
import { CardSkeleton, CardVideo } from "../../Global/Card/Card";
import Recommend from "../../Global/Recommend/Recommend";

const CategoryData = ({ title, category, isGrid = false }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryDataLoading, setCategoryDataLoading] = useState(true);

  useEffect(() => {
    const handleData = async () => {
      if (categoryDataLoading && Object.keys(category).length) {
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
  }, [category, categoryDataLoading]);

  useEffect(() => {
    setCategoryDataLoading(true);
  }, [category]);

  return (
    <section className="feature-section">
      {isGrid ? (
        <Recommend
          value={categoryData}
          loading={categoryDataLoading}
          title={title}
        />
      ) : (
        <>
          {!categoryDataLoading ? (
            <VideoList
              ChildComponent={CardVideo}
              items={categoryData}
            ></VideoList>
          ) : (
            <VideoList ChildComponent={CardSkeleton} height={215}></VideoList>
          )}
        </>
      )}
    </section>
  );
};

export default CategoryData;
