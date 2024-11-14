import React, { useCallback, useEffect, useState } from "react";
import Recommend from "../../Global/Recommend/Recommend";
import { FetchDocInfinity } from "../../../features/useFetch";
import InfiniteScroll from "../../Global/InfiniteScroll/InfiniteScroll";
import { CardSkeleton } from "../../Global/Card/Card";

const CategoryAll = ({ category, slug }) => {
  const [data, setData] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const limitPerPage = 8;

  const fetchData = useCallback(
    async (reset = false) => {
      const startingDoc = reset ? null : lastDoc;
      const fetchedData = await FetchDocInfinity(
        "Videos",
        "upload_date",
        "desc",
        startingDoc,
        limitPerPage,
        "category_id",
        category?.category_id,
        true
      );

      if (fetchedData.success) {
        setLastDoc(fetchedData.lastDoc);
        setData((prevData) =>
          reset ? fetchedData.docs : [...prevData, ...fetchedData.docs]
        );
        if (fetchedData.docs.length < limitPerPage) {
          setHasMore(false);
        }
      } else {
        console.error(fetchedData.error);
      }

      setLoading(false);
    },
    [lastDoc, category?.category_id, limitPerPage]
  );

  useEffect(() => {
    setLastDoc(lastDoc);
  }, [lastDoc]);

  useEffect(() => {
    if (loading) {
      setLastDoc(null);
      setData([]);
      setHasMore(true);
      fetchData(true);
    }
  }, [category, fetchData, loading]);

  useEffect(() => {
    setLoading(true);
  }, [category]);

  return (
    <section className="feature-section">
      <InfiniteScroll
        slug={slug}
        lastDoc={lastDoc}
        fetchMore={fetchData}
        hasMore={hasMore}
        loader={
          <div className="main-recommend-wrapper">
            <div className="recommend-inner">
              {loading && (
                <>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="recommend-item">
                      <CardSkeleton></CardSkeleton>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        }
      >
        <Recommend value={data} loading={loading} title={"All"} />
      </InfiniteScroll>
    </section>
  );
};

export default CategoryAll;
