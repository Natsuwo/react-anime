import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { UseUserMetaContext } from "./UserMeta";
import { FetchMyList } from "../features/useFetch";
import { deepEqual } from "../features/helper";

// create
const MyListContext = createContext();

// provider
const MyListContextProvider = ({ children }) => {
  const [addToList, setAddToList] = useState({});
  const [isLoading, setLoading] = useState(true);
  const { user, userMetaData, handleUserMetaData } = UseUserMetaContext();

  const [dataMyList, setDataMyList] = useState({ videos: [], episodes: [] });
  // My List Fetch
  const [myList, setMyList] = useState([]);

  const handleAddToList = async (video_id, type, debug) => {
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
  const handleMyList = useCallback(async () => {
    if (Object.keys(userMetaData).length && dataMyList) {
      const handleFetchMyList = await FetchMyList(dataMyList);
      setLoading(false);
      if (handleFetchMyList.success) {
        setMyList(handleFetchMyList.data);
      } else {
        setMyList([]);
      }
    }
  }, [userMetaData, dataMyList]); // Liệt kê các dependencies

  useEffect(() => {
    if (user || user === false) {
      const initialMyList = userMetaData?.my_list || {
        videos: [],
        episodes: [],
      };
      if (user?.logout) {
        setDataMyList({
          videos: [],
          episodes: [],
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
  }, [
    user,
    userMetaData?.my_list,
    dataMyList?.episodes?.length,
    dataMyList?.videos?.length,
  ]);

  useEffect(() => {
    const updateMyList = () => {
      const newAddToList = {};
      Object.keys(dataMyList).forEach((type) => {
        newAddToList[type] = {};
        dataMyList[type].forEach((item) => {
          newAddToList[type][item] = true;
        });
      });
      setAddToList(newAddToList);
    };

    if (dataMyList?.episodes.length || dataMyList?.videos.length) {
      updateMyList();
    }
  }, [dataMyList]);

  useEffect(() => {
    if (user || user === false) {
      handleMyList();
    }
  }, [handleMyList, user]);

  useEffect(() => {
    const updateUserMetaData = async () => {
      if (
        user !== null &&
        userMetaData &&
        Object.keys(userMetaData).length &&
        !deepEqual(userMetaData?.my_list, dataMyList) &&
        !isLoading
      ) {
        handleUserMetaData({ my_list: dataMyList });
      }
    };
    updateUserMetaData();
  }, [dataMyList, user, userMetaData, handleUserMetaData, isLoading]);

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
