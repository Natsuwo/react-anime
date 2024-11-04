import { useContext, createContext, useState, useEffect } from "react";
import { UseUserMetaContext } from "./UserMeta";
import { FetchMyList } from "../features/useFetch";

// create
const MyListContext = createContext();

// provider
const MyListContextProvider = ({ children }) => {
  const [addToList, setAddToList] = useState({});
  const [isLoading, setLoading] = useState(true);
  const {
    user,
    userMetaData,
    handleUserMetaData,
    isLoading: userMetaLoading,
  } = UseUserMetaContext();

  const [dataMyList, setDataMyList] = useState([]);
  // My List Fetch
  const [myList, setMyList] = useState([]);

  const handleAddToList = async (video_id) => {
    setDataMyList((prevList) => {
      const exists = prevList.includes(video_id);
      const updatedList = exists
        ? prevList.filter((video) => video !== video_id)
        : [...prevList, video_id];

      setAddToList((prev) => ({ ...prev, [video_id]: !exists }));

      return updatedList;
    });
  };

  const handleMyList = async () => {
    if (Object.keys(userMetaData).length && dataMyList) {
      const handleFetchMyList = await FetchMyList(dataMyList);
      setLoading(false);
      if (handleFetchMyList.success) {
        setMyList(handleFetchMyList.videos);
      } else {
        setMyList([]);
      }
    }

    if (user === false) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user || user === false) {
      const initialMyList = userMetaData?.my_list || [];
      setDataMyList(initialMyList);
    }
  }, [user, userMetaData]);

  useEffect(() => {
    const updateMyList = () => {
      const newAddToList = {};
      dataMyList.forEach((item) => {
        newAddToList[item] = true;
      });
      setAddToList(newAddToList);
      // localStorage.setItem("USER_METADATA", JSON.stringify({myList: dataMyList}));
    };

    updateMyList();
    handleMyList();
  }, [dataMyList, user]);

  useEffect(() => {
    const updateUserMetaData = async () => {
      if (
        user !== null &&
        userMetaData &&
        Object.keys(userMetaData).length &&
        JSON.stringify(userMetaData?.my_list) !== JSON.stringify(dataMyList) &&
        !isLoading
      ) {
        handleUserMetaData({ my_list: dataMyList });
      }
    };
    updateUserMetaData();
  }, [dataMyList, user, userMetaData]);

  return (
    <MyListContext.Provider
      value={{ myList, dataMyList, addToList, handleAddToList, isLoading }}
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
