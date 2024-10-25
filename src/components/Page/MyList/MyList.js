import React, { useEffect, useRef, useState } from "react";
import Breadcumb from "../../Global/Breadcrumb/Breadcumb";
import CardListEpsiode from "../../Global/CardListEpisode/CardListEpisode";
import UseIconList from "../../Global/SvgList/UseIconList";
import "./Mylist.css";

const MyList = () => {
  const sortRef = useRef(null);
  const [sortAcitve, setSortActive] = useState(0);
  const [showSort, setShowSort] = useState(false);
  const arrSortList = [
    "Update (Newest)",
    "Update (Latest)",
    "Release (Newest)",
    "Release (Latest)",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSort(false);
      }
    };

    if (showSort) {
      document.addEventListener("click", handleClickOutside);
    }

    // Xóa event listener khi component unmount hoặc khi showSort là false
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSort]);
  return (
    <main className="page-main">
      <div className="page-container">
        <Breadcumb />
        <h1 className="main-title">My List</h1>
        <div className="episode-list-sort-wrapper mt-2">
          <button
            ref={sortRef}
            className="episode-list-sort-btn"
            onClick={() => setShowSort(!showSort)}
          >
            <div className="sort-btn-text">{arrSortList[sortAcitve]}</div>
            <span className="sort-icon">
              <UseIconList icon="dropdown"></UseIconList>
            </span>
          </button>
          <ul
            className={`episode-list-sort-container${showSort ? " show" : ""}`}
          >
            {arrSortList.map((item, index) => (
              <li
                key={index}
                className={`episode-list-sort-item${
                  sortAcitve === index ? " active" : ""
                }`}
                onClick={() => setSortActive(index)}
              >
                <span className="sort-item-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="episode-list-wrapper">
          <div className="episode-list-container">
            <ul className="episode-list">
              <CardListEpsiode />
              <CardListEpsiode />
              <CardListEpsiode />
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyList;
