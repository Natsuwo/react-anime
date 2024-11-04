import React, { useEffect, useState } from "react";
import "./Sponsored.css";
import videotest from "../../../../assets/videos/trailer-1.mp4";
import OnLive from "../../../Global/Banner/Live/OnLive";
import LayoutSwitcher from "../../../Global/Banner/LayoutSwitcher/LayoutSwitcher";
import { UseToggleContext } from "../../../../context/ToggleContext";
import { CardList } from "../../../Global/Card/Card";
import {
  FetchAllLimit,
  FetchSingleDocumentByKey,
} from "../../../../features/useFetch";
import Skeleton from "../../../Global/Skeleton/Skeleton";

const Sponsored = () => {
  const { isSwitcher, handleSwitch } = UseToggleContext();
  // Category Data
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const defaultArr = Array.from({ length: 12 }, (_, i) => ({
    id: i,
  }));

  const handleCategoriesList = async () => {
    setLoading(true);
    const categorysList = await FetchAllLimit("Categories");
    categorysList.map(async (item) => {
      const data = await FetchSingleDocumentByKey(
        "Videos",
        "category_id",
        item.category_id,
        true
      );
      const dataWithCategory = { ...data, category_name: item.category_id };
      setCategoryData((prev) => {
        if (
          !prev.some(
            (existingItem) => existingItem.category_name === item.category_id
          )
        ) {
          return [...prev, dataWithCategory];
        }

        return prev;
      });
      setLoading(false);
    });
  };

  useEffect(() => {
    handleCategoriesList();
  }, []);

  return (
    <div className="sponsored-wrapper">
      <div className="sponsored-container">
        <div className="sponsored-ad">
          <div className="sponsored-content">
            <div className="overview">
              <div className="logo">
                <img
                  src="https://image.p-c2-x.abema-tv.com/image/creatives/8071b785-98ff-4233-a021-971fcedafece/8071b785-98ff-4233-a021-971fcedafece?height=256&quality=75&width=256"
                  alt=""
                />
              </div>
              <div className="description">Long, Many, Good</div>
              <button className="btn btn-special">More Details</button>
            </div>
            <div className="preview">
              <video src={videotest}></video>
            </div>
          </div>
        </div>
      </div>
      <div className="card-zone-wrapper">
        <div className="control-wrapper">
          <OnLive></OnLive>
          <LayoutSwitcher
            handleSwitch={handleSwitch}
            isSwitcher={isSwitcher}
          ></LayoutSwitcher>
        </div>
      </div>
      <div className="list-wrapper">
        {isLoading && (
          <>
            {defaultArr.map((item, index) => (
              <div key={index} className="row">
                <Skeleton width={"100%"} height={117} />
              </div>
            ))}
          </>
        )}

        {categoryData?.map((item, index) => (
          <div key={index + item.id} className="row">
            <CardList props={item}></CardList>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsored;
