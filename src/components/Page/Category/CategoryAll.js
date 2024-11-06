import React, { useCallback, useEffect, useState } from "react";
import Recommend from "../../Global/Recommend/Recommend";
import { FetchDocInfinity } from "../../../features/useFetch";
import InfiniteScroll from "../../Global/InfiniteScroll/InfiniteScroll";
import Skeleton from "../../Global/Skeleton/Skeleton";
import { CardSkeleton } from "../../Global/Card/Card";

const CategoryAll = ({ category, slug }) => {
  const [data, setData] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limitPerPage = 8;

  const fetchData = useCallback(async () => {
    setLoading(true);

    const data = await FetchDocInfinity(
      "Videos",
      "upload_date",
      "desc",
      lastDoc,
      limitPerPage,
      "category_id",
      category?.category_id,
      true
    );

    if (data.success) {
      setLastDoc(data.lastDoc);
      setData((prevData) => [...prevData, ...data.docs]);

      if (data.docs.length < limitPerPage) {
        setHasMore(false);
      }
    } else {
      console.error(data.error);
    }

    setLoading(false);
  }, [lastDoc, category?.category_id, limitPerPage, slug]);

  useEffect(() => {
    setLastDoc(lastDoc);
  }, [lastDoc]);

  useEffect(() => {
    setLastDoc(null);
    setLoading(false);
    setHasMore(true);
    setData([]);
  }, [slug]);

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
