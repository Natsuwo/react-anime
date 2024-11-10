import React, { useEffect, useRef, useState } from "react";
import "./MainCarousel.css";
import UseIconList from "../SvgList/UseIconList";
import Skeleton from "../Skeleton/Skeleton";

const MainCarousel = ({
  data = [],
  isLoading = false,
  itemsPerPage = 5,
  children,
  hiddenPage = false,
}) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  // click
  const [elementWidth, setElementWidth] = useState(undefined);
  const [position, setPosition] = useState(0);
  // pagination
  const [currentPage, setCurrentPage] = useState(0);

  // active card
  const [activeCard, setActiveCard] = useState(0);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - position); // lưu lại vị trí ban đầu so với position hiện tại
  };

  const dragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const walk = e.pageX - startX; // tính độ dịch chuyển từ điểm bắt đầu kéo
    setPosition(walk); // cập nhật position bằng độ dịch chuyển
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const newPage = Math.round(-position / (elementWidth * itemsPerPage));
    const clampedPage = Math.max(0, Math.min(newPage, totalPages - 1));
    setCurrentPage(clampedPage);
    setPosition(-clampedPage * elementWidth * itemsPerPage);
  };

  // click
  const handleClick = (location) => {
    if (location === "left" && currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setPosition(-newPage * elementWidth * itemsPerPage);
    } else if (location === "right" && currentPage < totalPages - 1) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setPosition(-newPage * elementWidth * itemsPerPage);
    }
  };

  // pagination

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handlePagination = (pageIndex) => {
    setCurrentPage(pageIndex);
    const scrollTo = -pageIndex * itemsPerPage * elementWidth;
    // scrollRef.current.scrollLeft = scrollTo;
    setPosition(scrollTo);
  };

  // card click
  const handleCardClick = (index) => {
    setActiveCard(index); // Cập nhật active card
  };

  useEffect(() => {
    if (data?.length && scrollRef.current) {
      if (!children) {
        const elWidth = scrollRef.current.querySelectorAll(".main-card")[0];
        setElementWidth(elWidth.clientWidth + 14);
      } else {
        const elWidth = scrollRef.current.querySelectorAll(".__slide-zone")[0];
        setElementWidth(elWidth.clientWidth + 14);
      }
    }
  }, [data]);

  const defaultArr = Array.from({ length: 12 });

  return (
    <div className="main-carousel-wrapper">
      <div className="main-carousel-content">
        {currentPage > 0 && (
          <div className="carousel-arrow-warpper __left">
            <div className="carousel-arrow">
              <span
                onClick={() => handleClick("left")}
                className="arrow-icon left"
              >
                <UseIconList icon="chevron-left" />
              </span>
            </div>
          </div>
        )}
        <div className="main-carousel-inner">
          <div
            ref={scrollRef}
            className="main-carousel"
            onMouseMove={dragging}
            onMouseDown={handleDragStart}
            onMouseLeave={handleDragEnd}
            onMouseUp={handleDragEnd}
            style={{
              left: `${position}px`,
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            {isLoading && (
              <>
                {defaultArr.map((item, index) => (
                  <Skeleton className={"__slide-zone"} key={index} />
                ))}
              </>
            )}

            {children}
          </div>
        </div>
        {totalPages - 1 > currentPage && (
          <div className="carousel-arrow-warpper __right">
            <div className="carousel-arrow">
              <span
                onClick={() => handleClick("right")}
                className="arrow-icon right"
              >
                <UseIconList icon="chevron-right" />
              </span>
            </div>
          </div>
        )}
      </div>

      {!hiddenPage && (
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              className={`${currentPage === index ? "active" : ""}`}
              key={index}
              onClick={() => handlePagination(index)}
            >
              <button></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MainCarousel;
