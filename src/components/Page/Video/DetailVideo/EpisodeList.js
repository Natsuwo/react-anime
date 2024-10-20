import React, { useState } from "react";
import "./EpisodeList.css";
import SeasonList from "./SeasonList";
import UseIconList from "../../../Global/SvgList/UseIconList";
import CardListEpsiode from "../../../Global/CardListEpisode/CardListEpisode";

const EpisodeList = () => {
  const [sortDesc, setSortDesc] = useState(true);
  const arrTabList = ["Official", "Trailer", "PV"];
  const [tablist, setTablist] = useState(0);
  return (
    <div className="episode-list-wrapper">
      <div className="episode-list-container">
        <h2 className="episode-sub-title">吸血鬼すぐ死ぬ</h2>
        <SeasonList />
        <div className="episode-list-control-bar">
          <div className="control-bar-wrapper">
            <ul className="control-group-tab-list">
              {arrTabList.map((item, index) => (
                <li
                  onClick={() => setTablist(index)}
                  key={index}
                  className={`${tablist === index ? "active" : ""}`}
                >
                  <button>{item}</button>
                </li>
              ))}
            </ul>
            <div className="sort-episode-wrapper">
              <button
                onClick={() => setSortDesc(!sortDesc)}
                className="sort-episode-btn"
              >
                <span className={`sort-btn-icon${sortDesc ? " reverce" : ""}`}>
                  <UseIconList icon="sort" />
                </span>
                <span className="sort-episode-text">Sort</span>
              </button>
            </div>
          </div>
        </div>
        <ul className="episode-list">
          <CardListEpsiode />
          <CardListEpsiode />
        </ul>
      </div>
    </div>
  );
};

export default EpisodeList;
