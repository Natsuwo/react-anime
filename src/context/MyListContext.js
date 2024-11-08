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

  const [dataMyList, setDataMyList] = useState({ videos: [], episodes: [] });
  // My List Fetch
  const [myList, setMyList] = useState({ videos: [], episodes: [] });

  const handleAddToList = async (video_id, type) => {
    if (!type) return;
    setDataMyList((prevList) => {
      const exists = prevList[type]?.includes(video_id);

      const updatedList = {
        ...prevList,
        [type]: exists
          ? prevList[type].filter((id) => id !== video_id)
          : [...(prevList[type] || []), video_id],
      };

      setAddToList((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          [video_id]: !exists,
        },
      }));

      return updatedList;
    });
  };

  const handleMyList = async () => {
    if (Object.keys(userMetaData).length && dataMyList) {
      const handleFetchMyList = await FetchMyList(dataMyList);
      setLoading(false);
      if (handleFetchMyList.success) {
        setMyList({
          videos: handleFetchMyList.videos,
          episodes: handleFetchMyList.episodes,
        });
      } else {
        setMyList({ videos: [], episodes: [] });
      }
    }

    if (user === false) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user || user === false) {
      const initialMyList = userMetaData?.my_list || {
        episodes: [],
        videos: [],
      };
      if (user?.logout) {
        setDataMyList({
          episodes: [],
          videos: [],
        });
        return;
      } else if (
        !dataMyList?.episodes?.length &&
        !dataMyList?.videos?.length &&
        userMetaData?.my_list
      ) {
        setDataMyList(initialMyList);
      }
    }
  }, [user, userMetaData]);

  useEffect(() => {
    const updateMyList = () => {
      const newAddToList = {};
      Object.keys(dataMyList).forEach((type) => {
        dataMyList[type].forEach((item) => {
          newAddToList[item] = true;
        });
      });
      setAddToList(newAddToList);
    };

    if (dataMyList?.episodes.length || dataMyList?.videos.length) {
      updateMyList();
    }

    if (user || user === false) {
      handleMyList();
    }
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
