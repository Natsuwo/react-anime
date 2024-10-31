import { useContext, createContext, useState, useEffect } from "react";

// create
const MyListContext = createContext();

// provider
const MyListContextProvider = ({ children }) => {
  const [addToList, setAddToList] = useState({});
  const [isLoading, setLoading] = useState(true);

  const dataMyListLocal = localStorage.getItem("USER_LIST")
    ? JSON.parse(localStorage.getItem("USER_LIST"))
    : [];

  const [dataMyList, setDataMyList] = useState(dataMyListLocal);

  const handleAddToList = (video_id, data) => {
    const exists = dataMyList.findIndex((video) => video.video_id === video_id);
    if (exists === -1) {
      const updatedList = [...dataMyList, data];
      setDataMyList(updatedList);
      setAddToList((prev) => ({ ...prev, [video_id]: true }));
    } else {
      const updatedList = dataMyList.filter(
        (video) => video.video_id !== video_id
      );
      setDataMyList(updatedList);
      setAddToList((prev) => ({ ...prev, [video_id]: false }));
    }
  };

  useEffect(() => {
    const updateMyList = () => {
      const newAddToList = {};
      dataMyList.forEach((item) => {
        newAddToList[item.video_id] = true;
      });
      setAddToList(newAddToList);
      localStorage.setItem("USER_LIST", JSON.stringify(dataMyList));
    };
    updateMyList();
  }, [dataMyList]);

  return (
    <MyListContext.Provider
      value={{ dataMyList, addToList, handleAddToList, isLoading }}
    >
      {children}
    </MyListContext.Provider>
  );
};

// usage the create
const UseMyListContext = () => {
  return useContext(MyListContext);
};

export { MyListContextProvider, UseMyListContext };
