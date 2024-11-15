import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  FetchDocument,
  UpdateDocument,
  FetchSingleDocumentByKey,
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
  const [adsEnabled, setAdsEnabled] = useState(true);
  const [userId, setUserId] = useState("");

  const handleUserMetaData = useCallback((data) => {
    setUserMetaData((prev) => ({ ...prev, ...data }));
  }, []);

  const [userLevel, setUserLevel] = useState({});
  const [levelLoading, setLevelLoading] = useState(true);
  const [waitFetch, setWaitFetch] = useState(true);

  const handleLevelLoading = useCallback((option) => {
    setLevelLoading(option);
  }, []);

  useEffect(() => {
    if (!Object.keys(userMetaData).length || !levelLoading) return;

    const handleData = async () => {
      const data = await FetchSingleDocumentByKey(
        "Subscription_Level",
        "level_id",
        userMetaData?.subscription_level || 1
      );
      if (data.success) {
        setUserLevel(data);
      }
      setLevelLoading(false);
    };

    handleData();
  }, [userMetaData, levelLoading]);

  useEffect(() => {
    if (user === false) {
      setLoadingUser(false);
    }
    const fetchUserMetaData = async () => {
      if (user && !user?.logout) {
        const metaDataFromDB = await FetchDocument("UserMetaData", user.uid);
        setUserMetaData(metaDataFromDB);
        setPrevMetaData(metaDataFromDB);
        setUserId(metaDataFromDB.userId);
        setWaitFetch(false);
        setLevelLoading(true);
      } else {
        const localMetaData = localStorage.getItem("USER_METADATA")
          ? JSON.parse(localStorage.getItem("USER_METADATA"))
          : {};

        setUserMetaData(localMetaData);
        setUserId(localMetaData.userId);
      }
      setLoading(false);
      setLoadingUser(false);
    };
    setWaitFetch(true);
    setLoading(true);
    setLoadingUser(true);
    fetchUserMetaData();
  }, [user]);

  const handeUpdateUserMeta = useCallback(async () => {
    setLoading(true);
    await UpdateDocument(userMetaData, "UserMetaData", user.uid);
    setPrevMetaData(userMetaData);
    setLoading(false);
  }, [userMetaData, user?.uid]);

  useEffect(() => {
    if (!isLoading && !waitFetch) {
      if (
        user &&
        JSON.stringify(prevMetaData) !== JSON.stringify(userMetaData)
      ) {
        handeUpdateUserMeta();
      }

      if (user?.logout) {
        setUserMetaData({});
      }
    }
    if (user === false) {
      localStorage.setItem("USER_METADATA", JSON.stringify(userMetaData));
    }
  }, [
    userMetaData,
    user,
    prevMetaData,
    isLoading,
    handeUpdateUserMeta,
    waitFetch,
  ]);

  useEffect(() => {
    if (userMetaData?.subscription_level === 3) {
      setAdsEnabled(false);
    }
  }, [userMetaData?.subscription_level]);

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
        setUserMetaData,
        adsEnabled,
        handleLevelLoading,
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
