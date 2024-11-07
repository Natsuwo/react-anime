import React, { useEffect, useState } from "react";
import { getDoubleFind } from "../../../features/useFetch";
import VideoList from "../../Global/VideoList/VideoList";
import { CardVideo } from "../../Global/Card/Card";

const CategoryPremium = ({ category, slug }) => {
  const [categoryPremium, setCategoryPremium] = useState([]);
  const [premiumLoading, setPremiumLoading] = useState(false);
  useEffect(() => {
    const handleData = async () => {
      if (!premiumLoading && Object.keys(category).length) {
        setPremiumLoading(true);
        const data = await getDoubleFind(
          "Episode",
          ["level", 2, false],
          ["category_id", category?.category_id, true],
          12
        );
        if (data.success) {
          setCategoryPremium(data.doc);
        }
      }
      setPremiumLoading(false);
    };
    handleData();
  }, [category, slug]);
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
