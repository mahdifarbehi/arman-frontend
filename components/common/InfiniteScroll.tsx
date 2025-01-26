import React, { useEffect, useState, useCallback } from "react";

function InfiniteScroll({
  fetchData,
}: {
  fetchData: (limit: number, offset: number) => Promise<void>;
}) {
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const limit = 10; // Number of items to fetch per request

  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return;

    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      setOffset((prev) => prev + limit);
    }
  }, [isLoading, hasMore]);

  useEffect(() => {
    const loadMoreData = async () => {
      setIsLoading(true);
      try {
        await fetchData(limit, offset);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (offset > 0) {
      loadMoreData();
    }
  }, [offset, fetchData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      {isLoading && (
        <div className="text-center my-4">
          <span>Loading...</span>
        </div>
      )}
      {!hasMore && (
        <div className="text-center my-4">
          <span>No more data to load.</span>
        </div>
      )}
    </>
  );
}

export default InfiniteScroll;
