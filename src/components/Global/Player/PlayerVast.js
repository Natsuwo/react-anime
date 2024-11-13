import React, { useEffect, useRef, useState } from "react";
import Seekbar from "./Seekbar";
import { formatTimePlayer } from "../../../features/helper";
import UseIconList from "../SvgList/UseIconList";

const PlayerVast = ({
  vastUrl,
  handleVastRun,
  handleVastLoaded,
  repeat = false,
  className,
}) => {
  const seekbarRef = useRef(null);
  const vastRef = useRef(null);
  const [buffered, setBuffered] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const handleTimeUpdate = () => {
    const currentWatchTime = vastRef.current.currentTime;
    setCurrentTime(currentWatchTime);
  };

  const handleVolume = () => {
    vastRef.current.muted = !vastRef.current.muted;
  };

  useEffect(() => {
    const video = vastRef.current;
    const updateBuffered = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const bufferedPercent = (bufferedEnd / video.duration) * 100;
        setBuffered(bufferedPercent);
      }
    };

    video.addEventListener("progress", updateBuffered);

    const updateProgress = () => {
      if (video.paused && !video.ended) {
        const currentTime = video.currentTime;
        setTimeout(() => {
          if (currentTime !== video.currentTime) {
            video.currentTime = currentTime;
          }
        }, 50);
      }

      const percentage = (video.currentTime / video.duration) * 100;
      setProgress(percentage);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("progress", updateBuffered);
    };
  }, []);

  useEffect(() => {
    const loadVastAd = () => {
      handleVastRun(true);
      const vastUrl = "https://basil79.github.io/vast-sample-tags/pg/vast.xml";
      fetch(vastUrl)
        .then((response) => response.text())
        .then((vastXml) => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(vastXml, "application/xml");
          const mediaFileUrl =
            xmlDoc.getElementsByTagName("MediaFile")[0].textContent;
          const adVideo = vastRef.current;
          adVideo.src = mediaFileUrl;
          adVideo.muted = true;
          adVideo.controls = false;

          adVideo.play().catch((err) => {
            console.error(err);
          });

          adVideo.onended = () => {
            if (adVideo.currentTime === adVideo.duration) {
              if (repeat) {
                adVideo.play().catch((err) => {
                  console.error(err);
                });
              } else {
                handleVastRun(false);
                handleVastLoaded(true);
              }
            }
          };
        })
        .catch((err) => {
          handleVastRun(false);
          handleVastLoaded(true);
          console.error("Failed to load VAST:", err);
        });
    };

    if (vastRef.current) {
      loadVastAd();
    }
  }, [handleVastRun, handleVastLoaded, repeat]);
  return (
    <div className={`video-vast-wrapper${className ? " " + className : ""}`}>
      <div className="yurei-player">
        <video
          onLoadedData={() => {
            setTotalTime(vastRef.current?.duration);
          }}
          onTimeUpdate={handleTimeUpdate}
          ref={vastRef}
          muted
        ></video>
        <div className="vast-overlay"></div>
        <Seekbar
          seekbarRef={seekbarRef}
          buffered={buffered}
          progress={progress}
        />
        <div className="vast-timer-wrapper">
          <div className="vast-timer">
            <span className="label">Sponsored Ad</span>
            <span className="time">
              {formatTimePlayer(totalTime - currentTime)}
            </span>
          </div>
        </div>
        <div className="player-vast-volume-wrapper">
          <span onClick={handleVolume} className="vast-volume-icon">
            <UseIconList
              icon={vastRef?.current?.muted ? "volume-off" : "volume"}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlayerVast;
