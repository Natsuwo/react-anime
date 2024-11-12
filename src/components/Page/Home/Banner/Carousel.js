import React, { useEffect, useRef, useState } from "react";
import { CardSlide } from "../../../Global/Card/Card";
import UseIconList from "../../../Global/SvgList/UseIconList";
import "./Carousel.css";
import Skeleton from "../../../Global/Skeleton/Skeleton";
import CardSponsored from "../../../../assets/images/png/card_sponsored.png";

const Carousel = ({
  isSponsored,
  sponsored,
  data = [],
  isLoading = false,
  itemsPerPage = 5,
  children,
  hiddenPage = false,
  handleSelect,
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
    if (data?.length) {
      if (!children) {
        const elWidth = scrollRef.current.querySelectorAll(".main-card")[0];
        setElementWidth(elWidth.clientWidth + 14);
      } else {
        const elWidth = scrollRef.current.querySelectorAll(".__slide-zone")[0];
        setElementWidth(elWidth.clientWidth + 14);
      }
    }
  }, [data]);

  useEffect(() => {
    handleSelect(activeCard);
  }, [activeCard]);

  useEffect(() => {
    if (!isSponsored & (activeCard === 99)) {
      handleCardClick(0);
    }
  }, [isSponsored]);

  const defaultArr = Array.from({ length: 12 });

  return (
    <div className="carousel-wrapper">
      <div className="carousel-content">
        {currentPage > 0 && (
          <span onClick={() => handleClick("left")} className="arrow-icon left">
            <UseIconList icon="chevron-left" />
          </span>
        )}
        <div
          ref={scrollRef}
          className="carousel"
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
                <Skeleton
                  className={"main-card"}
                  key={index}
                  width={208}
                  height={117}
                />
              ))}
            </>
          )}

          {children ? (
            children
          ) : (
            <>
              {sponsored && (
                <CardSlide
                  props={{
                    highlighted_thumbnail: CardSponsored,
                    category_id: [99],
                  }}
                  index={99}
                  isActive={activeCard === 99}
                  onCardClick={handleCardClick}
                ></CardSlide>
              )}
              {data?.map((item, index) => (
                <CardSlide
                  props={item}
                  key={index}
                  index={index}
                  isActive={activeCard === index}
                  onCardClick={handleCardClick}
                ></CardSlide>
              ))}
            </>
          )}
        </div>
        {totalPages - 1 > currentPage && (
          <span
            onClick={() => handleClick("right")}
            className="arrow-icon right"
          >
            <UseIconList icon="chevron-right" />
          </span>
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

export default Carousel;
