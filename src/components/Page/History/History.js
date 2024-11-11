import React, { useEffect, useRef, useState } from "react";
import Breadcumb from "../../Global/Breadcrumb/Breadcumb";
import CardListEpsiode from "../../Global/CardListEpisode/CardListEpisode";
import { UseUserMetaContext } from "../../../context/UserMeta";
import { getDocumentsByArray } from "../../../features/useFetch";
import InfiniteScroll from "../../Global/InfiniteScroll/InfiniteScroll";
import YureiLoading from "../../Global/YureiLoading/YureiLoading";

const History = () => {
  const { userMetaData, handleUserMetaData } = UseUserMetaContext();
  const [historyData, setHistoryData] = useState([]);
  const [historyList, setHistoryList] = useState([]);

  const currentPageRef = useRef(1);
  const isLoadingRef = useRef(false);
  const itemsPerPage = 10;

  const loadMoreItems = async () => {
    if (isLoadingRef.current) return;
    const currentPage = currentPageRef.current;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentHistoryIds = historyList.slice(startIndex, endIndex);
    // Fetch items for the current page
    isLoadingRef.current = true;
    const data = await getDocumentsByArray("Videos", currentHistoryIds);
    if (data.success) {
      setHistoryData((prevData) => [...prevData, ...data.docs]);
      currentPageRef.current += 1;
    }
    isLoadingRef.current = false;
  };

  const deleteHistory = async (index) => {
    const newHistoryList = [...historyList];
    newHistoryList.splice(index, 1);
    setHistoryList(newHistoryList);
    await handleUserMetaData({ history_list: newHistoryList });
  };

  useEffect(() => {
    if (userMetaData?.history_list !== undefined) {
      setHistoryList(userMetaData?.history_list);
    }
  }, [userMetaData?.history_list]);

  useEffect(() => {
    if (Object.keys(userMetaData).length > 0 && historyList !== undefined) {
      loadMoreItems();
    }
  }, [historyList]);

  return (
    <main className="page-main">
      <div className="page-container">
        <div className="container__mobile">
          <Breadcumb items={[{ title: "History" }]} />
        </div>

        <h1 className="main-title mb-2 container__mobile">History</h1>
        <div className="episode-list-wrapper">
          <div className="episode-list-container">
            <InfiniteScroll
              fetchMore={loadMoreItems}
              hasMore={historyData.length < historyList?.length}
              loader={<YureiLoading style={{ height: "100vh" }} width={75} />}
            >
              <ul className="episode-list">
                {historyData?.map((item, index) => (
                  <CardListEpsiode
                    onClick={() => deleteHistory(index)}
                    mylist={true}
                    key={index}
                    data={item}
                    showDesc={false}
                    showSupplements={false}
                  />
                ))}
              </ul>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </main>
  );
};

export default History;
