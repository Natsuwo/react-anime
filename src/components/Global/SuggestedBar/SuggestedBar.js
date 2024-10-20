import React from "react";
import "./SuggestedBar.css";
import { Link } from "react-router-dom";

const SuggestedBar = () => {
  return (
    <div className="detail-suggested-wrapper">
      <div className="detail-suggested-inner">
        <Link className="link-block" to="#">
          <div className="detail-suggested-container">
            <div className="suggested-left">
              <div className="suggested-thumbnail">
                <img
                  src="https://image.p-c2-x.abema-tv.com/image/programs/149-14_s1_p1/thumb002.png?background=000000&fit=fill&height=216&quality=75&version=1702539828&width=384"
                  alt=""
                />
              </div>
            </div>
            <div className="suggested-right">
              <p className="suggested-meta-text">Continue watching</p>
              <p className="suggested-title">
                <span className="clamp-text">
                  第1話 『退治人（ハンター）来たりて空を跳ぶ 前編』ほか２本
                </span>
              </p>
              <div className="suggested-progressbar">
                <div className="progressbar-loading">
                  <div
                    className="progressbar-loaded"
                    style={{ transform: "scale(0.0787623, 1)" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SuggestedBar;
