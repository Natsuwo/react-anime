import React from "react";
import cateTagList from "./CateTagList";

const CategoryTag = ({ type }) => {
  const Icon = cateTagList[type];
  if (!Icon) return null;

  return <Icon />;
};

export default CategoryTag;
