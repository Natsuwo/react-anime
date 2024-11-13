import React, { useCallback, useEffect, useRef, useState } from "react";
import Breadcumb from "../../Global/Breadcrumb/Breadcumb";
import CardListEpsiode from "../../Global/CardListEpisode/CardListEpisode";
import UseIconList from "../../Global/SvgList/UseIconList";

import AddToListImg from "../../../assets/images/png/Add-To-List-Img.png";
import AddToListImg2X from "../../../assets/images/png/Add-To-List-Img@2x.png";
import AddToListImgWebp from "../../../assets/images/webp/Add-To-List-Img.webp";
import AddToListImgWebp2X from "../../../assets/images/webp/Add-To-List-Img_2x.webp";

import ResponsiveImage from "../../Global/ResponsiveImage/ResponsiveImage";
import "./Mylist.css";

import { UseMyListContext } from "../../../context/MyListContext";
import { handleSortData } from "../../../features/helper";
import YureiLoading from "../../Global/YureiLoading/YureiLoading";
import { UseToastMyListContext } from "../../../context/ToastMyListContext";

const MyList = () => {
  const sortRef = useRef(null);
  const { myList, isLoading } = UseMyListContext();
  const [sortAcitve, setSortActive] = useState(0);
  const [showSort, setShowSort] = useState(false);
  const [sortData, setSortData] = useState([]);
  const arrSortList = [
    "Update (Newest)",
    "Update (Latest)",
    "Release (Newest)",
    "Release (Latest)",
  ];
  const { handleToast, handleToastCondition } = UseToastMyListContext();

  const handleDeleteItemSort = async (index) => {
    const newSortData = sortData;
    newSortData.splice(index, 1);
    setSortData(newSortData);
    handleToastCondition(false);
    handleToast(true);
  };

  const handleSortItem = useCallback(
    (index) => {
      switch (index) {
        case 0:
          setSortData(handleSortData(myList, "last_modified_date", "desc"));
          break;
        case 1:
          setSortData(handleSortData(myList, "last_modified_date", "asc"));
          break;
        case 2:
          setSortData(handleSortData(myList, "upload_date", "desc"));
          break;
        case 3:
          setSortData(handleSortData(myList, "upload_date", "asc"));
          break;
        default:
          break;
      }
    },
    [myList]
  );

  useEffect(() => {
    const updateSort = () => {
      handleSortItem(sortAcitve);
    };

    if (!isLoading) {
      updateSort();
    }

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
  }, [showSort, isLoading, handleSortItem, sortAcitve]);
  return (
    <main className="page-main">
      <div className="page-container">
        <div className="container__mobile">
          <Breadcumb items={[{ title: "My List" }]} />
          <h1 className="main-title">My List</h1>
        </div>
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
                onClick={() => {
                  handleSortItem(index);
                  setSortActive(index);
                }}
              >
                <span className="sort-item-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="episode-list-wrapper">
          <section className="episode-list-container">
            {isLoading ? (
              <div
                style={{
                  width: "100%",
                  minHeight: "540px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <YureiLoading />
              </div>
            ) : (
              <>
                {sortData.length > 0 ? (
                  <ul className="episode-list">
                    {sortData.map((item, index) => (
                      <CardListEpsiode
                        onClick={() => handleDeleteItemSort(index)}
                        key={index}
                        data={item}
                        mylist={true}
                        showDesc={false}
                        showSupplements={false}
                      />
                    ))}
                  </ul>
                ) : (
                  <div className="add-to-list-empty">
                    <div className="add-to-list-empty-title">
                      Create your own watchlist so you don't miss any videos you
                      want to watch.
                    </div>
                    <div className="add-to-list-empty-desc">
                      You can add videos by pressing the 'Add to My List'
                      button."
                    </div>
                    <div className="add-to-my-list-image-demo">
                      <ResponsiveImage
                        webpSrcSet={`${AddToListImgWebp} 1x, ${AddToListImgWebp2X} 2x`}
                        pngSrcSet={`${AddToListImg} 1x, ${AddToListImg2X} 2x`}
                        alt="Add To List Empty Image Demo"
                        width="348"
                        height="264"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default MyList;
