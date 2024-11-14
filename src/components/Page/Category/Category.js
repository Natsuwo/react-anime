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

  useEffect(() => {
    const handleCategory = async () => {
      const category = await FetchSingleDocumentByKey(
        "Categories",
        "slug",
        slug
      );
      if (category.success) {
        setCategory(category);
      }
    };
    handleCategory();
  }, [slug]);

  const breadcrumb = [{ title: category?.name }];

  return (
    <main className="page-main">
      <div className="page-container-fluid">
        <div className="main-content-wrapper">
          <Breadcumb items={breadcrumb} />
          <h1 className="main-title mb-2">{category.name}</h1>
          <CategoryData category={category}></CategoryData>
          <CategoryTag category={category}></CategoryTag>
          <CategoryRank category={category}></CategoryRank>
          <CategoryFree category={category}></CategoryFree>
          <CategoryPremium category={category}></CategoryPremium>
          {category?.category_id && (
            <CategoryAll slug={slug} category={category}></CategoryAll>
          )}
        </div>
      </div>
    </main>
  );
};

export default Category;
