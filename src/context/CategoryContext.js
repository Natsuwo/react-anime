import { useContext, createContext, useState, useEffect } from "react";
import { FetchAllLimit } from "../features/useFetch";

// create
const CategoryContext = createContext();

// provider
const CategoryContextProvider = ({ children }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCategory = async () => {
      if (!isLoading && categoryList.length === 0) {
        setLoading(true);
        const cateList = await FetchAllLimit("Categories");
        setCategoryList(cateList);
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryList.length]);

  return (
    <CategoryContext.Provider value={{ isLoading, categoryList }}>
      {children}
    </CategoryContext.Provider>
  );
};

// usage the create
const UseCategoryContext = () => {
  return useContext(CategoryContext);
};

export { CategoryContextProvider, UseCategoryContext };
