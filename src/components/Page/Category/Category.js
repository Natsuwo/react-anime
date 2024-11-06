import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Category.css";
import { useParams } from "react-router-dom";
import Breadcumb from "../../Global/Breadcrumb/Breadcumb";
import {
  FetchDocInfinity,
  FetchSingleDocumentByKey,
} from "../../../features/useFetch";
import CategoryData from "./CategoryData";
import CategoryTag from "./CategoryTag";
import CategoryRank from "./CategoryRank";
import CategoryFree from "./CategoryFree";
import CategoryPremium from "./CategoryPremium";
import Recommend from "../../Global/Recommend/Recommend";
import Skeleton from "../../Global/Skeleton/Skeleton";
import { CardSkeleton } from "../../Global/Card/Card";

const Category = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState({});

  const handleCategory = async () => {
    const category = await FetchSingleDocumentByKey("Categories", "slug", slug);
    if (category.success) {
      setCategory(category);
    }
  };

  useEffect(() => {
    handleCategory();
  }, [slug]);

  const [data, setData] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limitPerPage = 8;

  const fetchData = useCallback(async () => {
    if (!hasMore) return;

    setLoading(true);
    const data = await FetchDocInfinity(
      "Episode",
      "upload_date",
      "desc",
      lastDoc,
      limitPerPage
    );

    if (data.success) {
      setLastDoc(data.lastDoc);
      setData((prevData) => [...prevData, ...data.docs]);

      if (data.docs.length < limitPerPage) {
        setHasMore(false);
      }
    } else {
      console.error(data.error);
    }

    setLoading(false);
  }, [lastDoc, limitPerPage, hasMore]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchData, loading, hasMore]);

  return (
    <main className="page-main">
      <div className="page-container-fluid">
        <div className="main-content-wrapper">
          <Breadcumb />
          <h1 className="main-title mb-2">{category.name}</h1>
          <CategoryData category={category} slug={slug}></CategoryData>
          <CategoryTag category={category} slug={slug}></CategoryTag>
          <CategoryRank category={category} slug={slug}></CategoryRank>
          <CategoryFree category={category} slug={slug}></CategoryFree>
          <CategoryPremium category={category} slug={slug}></CategoryPremium>
          <section className="feature-section">
            <Recommend value={data} loading={loading} title={"All"} />
          </section>
        </div>
      </div>
    </main>
  );
};

export default Category;
