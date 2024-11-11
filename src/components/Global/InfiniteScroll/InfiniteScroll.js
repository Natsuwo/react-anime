import React, { useEffect, useRef, useState } from "react";

const InfiniteScroll = ({
  fetchMore,
  hasMore,
  children,
  loader,
  endMessage,
  className,
  lastDoc,
  slug,
  isLoading,
}) => {
  const pageEndRef = useRef(null);
  const [currentSlug, setSlug] = useState(slug);
  useEffect(() => {
    if (!hasMore || isLoading) return;
    if (currentSlug !== slug) {
      setTimeout(() => {
        setSlug(slug);
      }, 500);
      return;
    }
    if (hasMore) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchMore();
        }
      });

      if (pageEndRef.current) {
        observer.observe(pageEndRef.current);
      }
      return () => {
        if (pageEndRef.current) {
          observer.unobserve(pageEndRef.current);
        }
      };
    }
  }, [hasMore, lastDoc, slug, currentSlug]);
  return (
    <div className={className}>
      {children}

      {hasMore ? <div ref={pageEndRef}>{loader}</div> : endMessage}
    </div>
  );
};

export default InfiniteScroll;
