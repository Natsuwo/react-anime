import React, { useEffect, useState } from "react";
import { GetDocumentsByQuery } from "../../../features/useFetch";
import VideoList from "../../Global/VideoList/VideoList";
import { CardVideo } from "../../Global/Card/Card";

const CategoryFree = ({ category, slug }) => {
  const [categoryFree, setCategoryFree] = useState([]);
  const [freeLoading, setFreeLoading] = useState(false);
  useEffect(() => {
    const handleData = async () => {
      if (!freeLoading && Object.keys(category).length) {
        setFreeLoading(true);
        const data = await GetDocumentsByQuery(
          "Episode",
          "level",
          1,
          false,
          12
        );
        if (data.success) {
          setCategoryFree(data.doc);
        }
        setFreeLoading(false);
      }
    };
    handleData();
  }, [category, slug]);

  return (
    <section className="feature-section">
      {category?.name && (
        <VideoList
          categoryTitle={category?.name + " Free"}
          ChildComponent={CardVideo}
          items={categoryFree}
          slidesToShow={4}
          totalSlides={categoryFree?.length}
        ></VideoList>
      )}
    </section>
  );
};

export default CategoryFree;
