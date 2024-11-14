import React, { useCallback, useEffect, useState } from "react";
import { getDoubleFind } from "../../../features/useFetch";
import VideoList from "../../Global/VideoList/VideoList";
import { CardVideo } from "../../Global/Card/Card";

const CategoryPremium = ({ category }) => {
  const [categoryPremium, setCategoryPremium] = useState([]);
  const [premiumLoading, setPremiumLoading] = useState(true);

  const handleData = useCallback(async () => {
    if (premiumLoading && Object.keys(category).length) {
      const data = await getDoubleFind(
        "Episode",
        ["level", 2, false],
        ["category_id", category?.category_id, true],
        12
      );
      if (data.success) {
        setCategoryPremium(data.doc);
      } else {
        setCategoryPremium([]);
      }
      setPremiumLoading(false);
    }
  }, [category, premiumLoading]);

  useEffect(() => {
    handleData();
  }, [category, premiumLoading, handleData]);

  useEffect(() => {
    setPremiumLoading(true);
  }, [category]);

  return (
    <section className="feature-section">
      {category?.name && categoryPremium?.length > 0 && (
        <VideoList
          categoryTitle={category?.name + " Premium"}
          ChildComponent={CardVideo}
          items={categoryPremium}
          slidesToShow={4}
          totalSlides={categoryPremium?.length}
          isLoading={premiumLoading}
        ></VideoList>
      )}
    </section>
  );
};

export default CategoryPremium;
