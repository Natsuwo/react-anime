import React, { useEffect, useRef, useState } from "react";
import "./MainCarousel.css";
import SvgList from "../../Global/SvgList/SvgList";

const MainCarousel = ({ ChildComponent }) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  // click
  const [elementWidth, setElementWidth] = useState(undefined);
  const [position, setPosition] = useState(0);
  // pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  // active card
  const [activeCard, setActiveCard] = useState(0);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setCurrentX(e.pageX);
  };

  const dragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const walk = (startX - currentX) * 1.5; // điều chỉnh độ nhạy
    setPosition((prev) => prev + walk);
    setCurrentX(e.pageX);
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    const newPage = Math.round(-position / (elementWidth * itemsPerPage));
    const clampedPage = Math.max(0, Math.min(newPage, totalPages - 1));
    setCurrentPage(clampedPage);
    setPosition(-clampedPage * elementWidth * itemsPerPage);
  };

  // click
  const handleClick = (location) => {
    // scrollRef.current.scrollLeft +=
    //   location === "left" ? -elementWidth * 5 : elementWidth * 5;

    if (location === "left") {
      setPosition((prev) => prev + elementWidth * itemsPerPage);
      setCurrentPage(currentPage - 1);
    } else {
      setPosition((prev) => prev - elementWidth * itemsPerPage);
      setCurrentPage(currentPage + 1);
    }
  };

  // pagination
  const items = Array.from({ length: 2 }, (_, i) => ({ id: i + 1 }));
  const totalPages = Math.ceil(items.length / itemsPerPage);

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
    const elWidth = scrollRef.current.querySelectorAll(
      ".video-card-wrapper"
    )[0];
    setElementWidth(elWidth.clientWidth + 14);
  }, []);
  return (
    <div className="main-carousel-wrapper">
      <div className="carousel-wrapper">
        <div className="carousel-content">
          {currentPage > 0 && (
            <span
              onClick={() => handleClick("left")}
              className="arrow-icon left"
            >
              <SvgList icon="left_arrow"></SvgList>
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
            {/* <div className="carousel-card-content" style={{ gap: 14 }}>
              
            </div> */}
            {items.map((item, index) => (
              <ChildComponent
                key={item.id}
                index={index}
                isActive={activeCard === index}
                onCardClick={handleCardClick}
              ></ChildComponent>
            ))}
          </div>
          {totalPages - 1 > currentPage && (
            <span
              onClick={() => handleClick("right")}
              className="arrow-icon right"
            >
              <SvgList icon="right_arrow"></SvgList>
            </span>
          )}
        </div>
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
      </div>
    </div>
  );
};

export default MainCarousel;
