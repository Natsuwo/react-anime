import React, { useEffect, useState } from "react";
import "./SuggestedBar.css";
import { Link } from "react-router-dom";

const SuggestedBar = ({ episodeListArr, initialWatchTime }) => {
  const [initialEpisode, setInitialEpisode] = useState();
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    if (episodeListArr && episodeListArr?.length > 0) {
      const filtered = episodeListArr?.filter(
        (item) => item.id === initialWatchTime.episodeId
      )[0];
      const progressPercentage = initialWatchTime.watchTime / filtered.duration;

      setPercentage(progressPercentage);
      setInitialEpisode(filtered);
    }
  }, [episodeListArr, initialWatchTime]);
  return (
    <div className="detail-suggested-wrapper">
      <div className="detail-suggested-inner">
        <Link
          to={`/video/episode/${initialEpisode?.id}`}
          className="link-block"
        >
          <div className="detail-suggested-container">
            <div className="suggested-left">
              <div className="suggested-thumbnail">
                <img src={initialEpisode?.thumbnail_url} alt="" />
              </div>
            </div>
            <div className="suggested-right">
              <p className="suggested-meta-text">Continue watching</p>
              <p className="suggested-title">
                <span className="clamp-text">{initialEpisode?.title}</span>
              </p>
              <div className="suggested-progressbar">
                <div className="progressbar-loading">
                  <div
                    className="progressbar-loaded"
                    style={{ transform: `scale(${percentage}, 1)` }}
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
