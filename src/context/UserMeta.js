import { useContext, createContext, useState, useEffect, useRef } from "react";
import {
  GetDocumentsByQuery,
  FetchDocument,
  UpdateDocument,
} from "../features/useFetch";
import useAuth from "../features/useAuth";

// create
const UserMetaContext = createContext();
// provider
const UserMetaContextProvider = ({ children }) => {
  const { user } = useAuth();
  const [isLoading, setLoading] = useState(true);

  const [loadingUser, setLoadingUser] = useState(true);
  const [prevMetaData, setPrevMetaData] = useState({});
  const [userMetaData, setUserMetaData] = useState({});
  const [userId, setUserId] = useState("");

  const handleUserMetaData = (data) => {
    setUserMetaData((prev) => ({ ...prev, ...data }));
  };

  const [userLevel, setUserLevel] = useState([]);
  const [levelLoading, setLevelLoading] = useState(true);

  useEffect(() => {
    const handleData = async () => {
      if (Object.keys(userMetaData).length && levelLoading) {
        const data = await GetDocumentsByQuery(
          "Subscription_Level",
          "level_id",
          userMetaData?.subscription_level
        );
        if (data.success) {
          setUserLevel(data.doc);
        }
        setLevelLoading(false);
      }
    };

    handleData();
  }, [userMetaData]);

  useEffect(() => {
    if (user === false) {
      setLoadingUser(false);
    }
    const fetchUserMetaData = async () => {
      if (user) {
        const metaDataFromDB = await FetchDocument("UserMetaData", user.uid);
        setUserMetaData(metaDataFromDB);
        setPrevMetaData(metaDataFromDB);
        setUserId(metaDataFromDB.userId);
        setLoadingUser(false);
      } else {
        const localMetaData = localStorage.getItem("USER_METADATA")
          ? JSON.parse(localStorage.getItem("USER_METADATA"))
          : {};

        setUserMetaData(localMetaData);
        setUserId(localMetaData.userId);
      }
      setLoading(false);
    };

    fetchUserMetaData();
  }, [user]);

  const handeUpdateUserMeta = async () => {
    setLoading(true);
    await UpdateDocument(userMetaData, "UserMetaData", user.uid);
    setPrevMetaData(userMetaData);
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoading) {
      if (
        user &&
        JSON.stringify(prevMetaData) !== JSON.stringify(userMetaData)
      ) {
        handeUpdateUserMeta();
      }
      if (user === false) {
        localStorage.setItem("USER_METADATA", JSON.stringify(userMetaData));
      }
    }
  }, [userMetaData]);

  return (
    <UserMetaContext.Provider
      value={{
        user,
        isLoading,
        handleUserMetaData,
        userMetaData,
        userId,
        userLevel,
        levelLoading,
        loadingUser,
      }}
    >
      {children}
    </UserMetaContext.Provider>
  );
};

// usage the create
const UseUserMetaContext = () => {
  return useContext(UserMetaContext);
};

export { UserMetaContextProvider, UseUserMetaContext };
