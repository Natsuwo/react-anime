import React, { useEffect, useRef, useState } from "react";
import Seekbar from "./Seekbar";
import { formatTimePlayer } from "../../../features/helper";

const PlayerVast = ({ vastUrl, handleVastRun, handleVastLoaded }) => {
  const seekbarRef = useRef(null);
  const vastRef = useRef(null);
  const [buffered, setBuffered] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const loadVastAd = () => {
    handleVastRun(true);
    const vastUrl = "https://basil79.github.io/vast-sample-tags/pg/vast.xml";
    fetch(vastUrl)
      .then((response) => response.text())
      .then((vastXml) => {
        // Parse XML và lấy URL của video quảng cáo
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(vastXml, "application/xml");
        const mediaFileUrl =
          xmlDoc.getElementsByTagName("MediaFile")[0].textContent;

        // Tạo thẻ video quảng cáo
        const adVideo = vastRef.current;
        adVideo.src = mediaFileUrl;
        adVideo.muted = true;
        adVideo.controls = false; // Hiển thị controls nếu cần

        // Gắn quảng cáo vào DOM
        adVideo.play().catch((err) => {
          console.error(err);
        });

        // Khi quảng cáo kết thúc, tiếp tục video chính
        adVideo.onended = () => {
          if (adVideo.currentTime === adVideo.duration) {
            handleVastRun(false);
            handleVastLoaded(true);
          }
        };
      })
      .catch((err) => {
        handleVastRun(false);
        handleVastLoaded(true);
        console.error("Failed to load VAST:", err);
      });
  };

  const handleTimeUpdate = () => {
    const currentWatchTime = vastRef.current.currentTime;
    setCurrentTime(currentWatchTime);
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
    if (vastRef.current) {
      loadVastAd();
    }
  }, [vastRef.current]);
  return (
    <div className="video-vast-wrapper mb-2">
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
      </div>
    </div>
  );
};

export default PlayerVast;
