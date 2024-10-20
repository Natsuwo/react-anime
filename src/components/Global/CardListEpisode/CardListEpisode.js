import React from "react";
import { Link } from "react-router-dom";
import UseIconList from "../SvgList/UseIconList";

const CardListEpsiode = ({ sidebar = false }) => {
  return (
    <>
      <li className="episode-list-item">
        <Link className="link-block" to="#">
          <div className="episode-list-item-wrapper">
            <div className="episode-list-current-play">
              <span className="current-play-icon">
                <UseIconList icon="play" />
              </span>
            </div>
            <div className="episode-list-item-thumbnail">
              <img
                src="https://image.p-c2-x.abema-tv.com/image/programs/149-19_s2_p1/thumb002.png?background=000000&fit=fill&height=144&quality=75&version=1702539828&width=256"
                alt=""
              />
            </div>
            <div className="episode-list-item-details">
              <div className="episode-list-item-title">
                <span
                  className="clamp-text"
                  style={{ WebkitLineClamp: sidebar ? 3 : 1 }}
                >
                  第2話『フロム トーキョー トゥ ネオ ベイサイド』
                </span>
              </div>
              <ul className="episode-list-item-info">
                <li>24分</li>
                <li>2023年</li>
                <li>9.0 万視聴</li>
              </ul>
              <div className="episode-list-item-tag">
                <div className="video-label">
                  <span className="label-text free">Free</span>
                </div>
              </div>
              <div className="episode-list-item-desc">
                <span className="clamp-text">
                  東京で活躍する若き吸血鬼退治人・籠目原ミカヅキが新横浜にやってきた。ロナルドたちは滅多に来ない後輩を歓迎するが、ミカヅキは冷めた態度を崩さない。討伐要請が入り、ロナルドらに実力を見せつけようとするが……？
                </span>
              </div>
            </div>
            <div className="episode-list-item-add-to-list">
              <button className="add-to-list-btn">
                <span className="add-to-list-icon">
                  <UseIconList icon="add" />
                </span>
              </button>
            </div>
          </div>
        </Link>
      </li>
    </>
  );
};

export default CardListEpsiode;
