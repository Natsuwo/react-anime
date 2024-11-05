import React, { useEffect, useRef, useState } from "react";
import "./Category.css";
import { Link, useParams } from "react-router-dom";
import Breadcumb from "../../Global/Breadcrumb/Breadcumb";
import {
  FetchSingleDocumentByKey,
  GetAllSort,
  GetDocumentsByQuery,
} from "../../../features/useFetch";
import VideoList from "../../Global/VideoList/VideoList";
import {
  CardRank,
  CardRankSkeleton,
  CardSkeleton,
  CardVideo,
} from "../../Global/Card/Card";
import UseIconList from "../../Global/SvgList/UseIconList";
import MainCarousel from "../../Global/Carousel/MainCarousel";

const Category = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState({});
  const arrTag = Array.from({ length: 20 });

  const handleCategory = async () => {
    const category = await FetchSingleDocumentByKey("Categories", "slug", slug);
    if (category.success) {
      setCategory(category);
    }
  };

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
  }, [category]);

  const [categoryRank, setCategoryRank] = useState([]);
  const [categoryRankLoading, setCategoryRankLoading] = useState(false);
  useEffect(() => {
    const handleData = async () => {
      if (
        category?.id &&
        !categoryRankLoading &&
        Object.keys(category).length
      ) {
        setCategoryRankLoading(true);
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
  }, [category]);

  const [categoryFree, setCategoryFree] = useState([]);
  const [freeLoading, setFreeLoading] = useState(false);
  useEffect(() => {
    const handleData = async () => {
      if (category?.id && !freeLoading && Object.keys(category).length) {
        setFreeLoading(true);
        const data = await GetDocumentsByQuery(
          "Episode",
          "category_id",
          category?.category_id,
          true,
          12
        );
        if (data.success) {
          setCategoryFree(data.doc);
        }
        setFreeLoading(false);
      }
    };
    handleData();
  }, [category]);

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
            {!categoryDataLoading ? (
              <VideoList
                ChildComponent={CardVideo}
                items={categoryData}
              ></VideoList>
            ) : (
              <VideoList ChildComponent={CardSkeleton} height={215}></VideoList>
            )}
          </section>
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
          <section className="feature-section">
            {category?.name && (
              <VideoList
                categoryTitle={category?.name + " rank"}
                ChildComponent={CardRank}
                items={categoryRank}
                slidesToShow={7}
                totalSlides={categoryRank?.length}
              ></VideoList>
            )}
          </section>
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
        </div>
      </div>
    </main>
  );
};

export default Category;
