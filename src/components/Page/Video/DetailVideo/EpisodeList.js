import React, { useEffect, useState } from "react";
import "./EpisodeList.css";
import SeasonList from "./SeasonList";
import UseIconList from "../../../Global/SvgList/UseIconList";
import CardListEpsiode from "../../../Global/CardListEpisode/CardListEpisode";

const EpisodeList = ({ title, value, loading, playingId }) => {
  const [sortDesc, setSortDesc] = useState(true);
  const [arrTabList, setArrTabList] = useState([]);
  const [episodesByType, setEpisodesByType] = useState({});
  const [tablist, setTablist] = useState("");

  useEffect(() => {
    const types = [];
    const episodesMap = {};

    value?.forEach((item) => {
      if (item.id === playingId) {
        setTablist(item.type);
      }
      if (!types.includes(item.type)) {
        types.push(item.type);
      }
      if (!episodesMap[item.type]) {
        episodesMap[item.type] = []; // Khởi tạo mảng nếu chưa tồn tại
      }
      episodesMap[item.type] = [...episodesMap[item.type], item];
    });

    setArrTabList(types);
    if (!playingId) {
      setTablist(types[0]);
    }
    setEpisodesByType(episodesMap);
  }, [value]);

  return (
    <div className="episode-list-wrapper">
      <div className="episode-list-container">
        <h2 className="episode-sub-title">{title}</h2>
        <SeasonList />
        <div className="episode-list-control-bar">
          <div className="control-bar-wrapper">
            <ul className="control-group-tab-list">
              {arrTabList.map((item, index) => (
                <li
                  onClick={() => setTablist(item)}
                  key={index}
                  className={`${tablist === item ? "active" : ""}`}
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
          {episodesByType[tablist]?.map((item, index) => (
            <CardListEpsiode
              loading={loading}
              playingId={playingId}
              key={index}
              data={item}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EpisodeList;
