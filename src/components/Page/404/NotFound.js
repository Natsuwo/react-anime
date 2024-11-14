import React from "react";
import "./NotFound.css";
import YureiLoading from "../../Global/YureiLoading/YureiLoading";
import Header from "../../Global/Header/Header";

const NotFound = () => {
  return (
    <>
      <Header hideMenu={false} hiddenSearch={true} />
      <div className="notfound-wrapper">
        <div className="notfound-content">
          <div className="upper">
            <div className="notfound-yurei">
              <YureiLoading
                className="notfound-yurei-loading"
                model="cry"
                type="stop"
              />
            </div>
            <div className="notfound-title">Sorry</div>
          </div>
          <div className="lower">
            <h1>The page you are looking for could not be found</h1>
            <p>
              It may be temporarily unavailable, or it may have been deleted or
              moved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
