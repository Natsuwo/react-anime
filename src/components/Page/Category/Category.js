import React, { useEffect, useState } from "react";
import "./Category.css";
import { useParams } from "react-router-dom";
import Breadcumb from "../../Global/Breadcrumb/Breadcumb";
import { FetchSingleDocumentByKey } from "../../../features/useFetch";
import CategoryData from "./CategoryData";
import CategoryTag from "./CategoryTag";
import CategoryRank from "./CategoryRank";
import CategoryFree from "./CategoryFree";
import CategoryPremium from "./CategoryPremium";
import CategoryAll from "./CategoryAll";

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
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [slug]);

  const breadcrumb = [{ title: category?.name }];

  return (
    <main className="page-main">
      <div className="page-container-fluid">
        <div className="main-content-wrapper">
          <Breadcumb items={breadcrumb} />
          <h1 className="main-title mb-2">{category.name}</h1>
          <CategoryData category={category} slug={slug}></CategoryData>
          <CategoryTag category={category} slug={slug}></CategoryTag>
          <CategoryRank category={category} slug={slug}></CategoryRank>
          <CategoryFree category={category} slug={slug}></CategoryFree>
          <CategoryPremium category={category} slug={slug}></CategoryPremium>
          {category?.category_id && (
            <CategoryAll category={category} slug={slug}></CategoryAll>
          )}
        </div>
      </div>
    </main>
  );
};

export default Category;
