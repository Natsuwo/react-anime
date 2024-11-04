import React, { useEffect, useState } from "react";
import "./Category.css";
import { Link, useParams } from "react-router-dom";
import Breadcumb from "../../Global/Breadcrumb/Breadcumb";
import {
  FetchSingleDocumentByKey,
  GetDocumentsByQuery,
} from "../../../features/useFetch";
import VideoList from "../../Global/VideoList/VideoList";
import { CardSkeleton, CardVideo } from "../../Global/Card/Card";
import UseIconList from "../../Global/SvgList/UseIconList";
import MainCarousel from "../../Global/Carousel/MainCarousel";

const Category = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState({});

  const handleCategory = async () => {
    const category = await FetchSingleDocumentByKey("Categories", "slug", slug);
    if (category.success) {
      setCategory(category);
    }
  };

  const { value: categoryData, loading: isLoading } = GetDocumentsByQuery(
    "Videos",
    "category_id",
    category?.category_id,
    true
  );

  const arrTag = Array.from({ length: 20 });

  useEffect(() => {
    handleCategory();
  }, [slug]);

  return (
    <main className="page-main">
      <div className="page-container-fluid">
        <div className="main-content-wrapper">
          <Breadcumb />
          <h1 className="main-title mb-2">{category.name}</h1>
          <section className="feature-section">
            {!isLoading ? (
              <VideoList
                ChildComponent={CardVideo}
                items={categoryData}
              ></VideoList>
            ) : (
              <VideoList ChildComponent={CardSkeleton} height={215}></VideoList>
            )}
          </section>
          <section className="feature-section">
            <MainCarousel hiddenPage={true} data={arrTag} smallArrow={true}>
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
        </div>
      </div>
    </main>
  );
};

export default Category;
