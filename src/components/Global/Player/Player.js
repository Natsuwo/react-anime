import React, { useEffect, useRef, useState } from "react";
import "./Player.css";
import Video from "../../../assets/videos/trailer-1.mp4";
import { UsePlayerWide } from "../../../context/PlayerWideContext";
import VideoScreen from "./VideoScreen";
import ButtonHandle from "./ButtonHandle";
import PiPButon from "./PiPButon";
import VideoPlayerControls from "./VideoPlayerControls";

const Player = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const volumeRef = useRef(null);
  const seekbarRef = useRef(null);
  // Play pause
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState(false);
  // Time
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  //fast
  const [isHoldingMouse, setIsHoldingMouse] = useState(false);
  const [holdTimeout, setHoldTimeout] = useState(null);
  const [playbackRate, setPlaybackRate] = useState("1");
  const [wasPausedBefore, setWasPausedBefore] = useState(true);

  // Volume
  const [volume, setVolume] = useState(1);
  const [isMute, setIsMute] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume || 1);
  // FullScreen
  const [isFullscreen, setIsFullscreen] = useState(false);
  // SeekBar
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [buffered, setBuffered] = useState(0);
  // Wide Mode
  const { wideMode, handleWide } = UsePlayerWide();
  // PiPMode
  const [isPip, setIsPip] = useState(false);

  const handlePlay = (option) => {
    if (!readyToPlay) {
      setReadyToPlay(true);
    }
    if (option === "play") {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!isHoldingMouse && video) {
      if (!readyToPlay) {
        setReadyToPlay(true);
      }
      if (isPlaying) {
        video.pause(); // Nếu đang phát thì tạm dừng
      } else {
        video.play(); // Nếu đang tạm dừng thì phát tiếp
      }
      setIsPlaying(!isPlaying); // Cập nhật trạng thái
      setShowPlayPauseIcon(true);
      setTimeout(() => {
        setShowPlayPauseIcon(false);
      }, 500);
    }
  };

  const handleRewindForward = (option) => {
    if (option === "rewind") {
      videoRef.current.currentTime -= 10;
    } else {
      videoRef.current.currentTime += 10;
    }
  };

  const handleSpeedChange = (speed) => {
    videoRef.current.playbackRate = speed;
    setPlaybackRate(speed);
  };

  const handleSpeedChangeMouseDown = () => {
    if (videoRef.current) {
      // Lưu trạng thái của video trước khi đè chuột
      setWasPausedBefore(videoRef.current.paused);

      const timeout = setTimeout(() => {
        // Nếu video đang bị pause, khi đè chuột sẽ play và phát x2
        setIsHoldingMouse(true);
        videoRef.current.playbackRate = 2;
        if (videoRef.current.paused) {
          handlePlay("play");
        }
      }, 1000); // Delay 1 giây

      setHoldTimeout(timeout);
    }
  };

  const handleSpeedChangeMouseUp = () => {
    clearTimeout(holdTimeout);
    setHoldTimeout(null);

    if (videoRef.current && isHoldingMouse) {
      videoRef.current.playbackRate = playbackRate; // Trở lại tốc độ bình thường khi thả chuột
      setTimeout(() => {
        setIsHoldingMouse(false);
      }, 200); // delay holding

      // Khôi phục trạng thái trước đó (pause nếu trước đó đang bị pause)
      if (wasPausedBefore) {
        handlePlay("pause");
      }
    }
  };

  const handleFullScreen = () => {
    const playerContainer = document.querySelector(".yurei-player-wrapper");
    if (!isFullscreen) {
      if (playerContainer.requestFullscreen) {
        playerContainer.requestFullscreen();
      } else if (playerContainer.mozRequestFullScreen) {
        playerContainer.mozRequestFullScreen(); // Firefox
      } else if (playerContainer.webkitRequestFullscreen) {
        playerContainer.webkitRequestFullscreen(); // Chrome, Safari and Opera
      } else if (playerContainer.msRequestFullscreen) {
        playerContainer.msRequestFullscreen(); // IE/Edge
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen(); // Firefox
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); // Chrome, Safari and Opera
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen(); // IE/Edge
      }
      setIsFullscreen(false);
    }
  };

  const handleVolumeChange = (e) => {
    const volumeBar = volumeRef.current.getBoundingClientRect();
    const newVolume = Math.max(
      0,
      Math.min(1, (volumeBar.bottom - e.clientY) / volumeBar.height)
    );
    if (videoRef.current.muted) {
      videoRef.current.muted = false;
      setIsMute(false);
    }
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const startDrag = (e) => {
    handleVolumeChange(e); // Gọi ngay khi bắt đầu kéo
    window.addEventListener("mousemove", handleVolumeChange); // Lắng nghe sự kiện kéo
    window.addEventListener("mouseup", stopDrag); // Ngừng kéo khi thả chuột
  };

  const stopDrag = () => {
    window.removeEventListener("mousemove", handleVolumeChange); // Hủy lắng nghe sự kiện di chuột
    window.removeEventListener("mouseup", stopDrag); // Hủy lắng nghe sự kiện thả chuột
  };

  const handleMute = () => {
    if (!isMute) {
      // Khi chưa mute, lưu lại giá trị volume hiện tại và mute
      setPrevVolume(volume ? volume : 1);
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
      setVolume(0);
    } else {
      // Khi đang mute, phục hồi lại volume trước đó
      videoRef.current.muted = false;
      videoRef.current.volume = prevVolume ? prevVolume : 1;
      setVolume(prevVolume ? prevVolume : 1);
    }
    setIsMute(!isMute); // Cuối cùng mới thay đổi trạng thái mute
  };

  // Bắt đầu kéo seekbar
  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateSeek(e);
  };

  // Kéo seekbar
  const handleMouseMove = (e) => {
    if (isDragging) {
      updateSeek(e);
    }
  };

  // Kết thúc kéo
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Cập nhật vị trí của video dựa trên vị trí thanh seekbar
  const updateSeek = (e) => {
    const seekBar = seekbarRef.current;
    const rect = seekBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / rect.width) * videoRef.current.duration;

    videoRef.current.currentTime = newTime;
    setProgress((offsetX / rect.width) * 100);
  };

  // Auto Play
  // const handleAutoPlay = () => {
  //   const video = videoRef.current;
  //   video
  //     .play()
  //     .then(() => {
  //       setIsPlaying(true);
  //     })
  //     .catch((error) => {
  //       console.error("Error attempting to play video:", error);
  //     });
  // };

  const handlePiP = (opt) => {
    setIsPip(opt);
  };

  // handle key

  const handleKeyDown = (event) => {
    const { key, shiftKey } = event;

    switch (key) {
      case " ": // Space để play/pause video
        event.preventDefault(); // Ngăn chặn scroll khi nhấn Space
        togglePlayPause();
        break;
      case "f": // F để vào full screen
        handleFullScreen();
        break;
      case "F": // Shift + F để vào wide mode
        if (shiftKey) {
          handleWide(!wideMode);
        }
        break;
      case "ArrowRight": // Mũi tên phải để tua tới
        handleRewindForward("forward");
        break;
      case "ArrowLeft": // Mũi tên trái để tua lùi
        handleRewindForward("rewind");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    // Progress / SeekBar
    const updateProgress = () => {
      const percentage = (video.currentTime / video.duration) * 100;
      setProgress(percentage);
    };

    video.addEventListener("timeupdate", updateProgress);

    // Buffered

    const updateBuffered = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const bufferedPercent = (bufferedEnd / video.duration) * 100;
        setBuffered(bufferedPercent);
      }
    };

    video.addEventListener("progress", updateBuffered);

    // Local Muted
    // Kiểm tra trạng thái mute từ localStorage khi component mount

    // Lắng nghe sự kiện loadeddata

    const handleLoadedData = () => {
      // Khi video đã loaded, tự động phát
      // handleAutoPlay();
      setIsLoading(false);
    };

    video.addEventListener("loadeddata", handleLoadedData);

    // PiPmode
    const handleScroll = () => {
      // Vị trí hiện tại của scroll
      const player = playerRef.current;
      const scrollPosition = window.scrollY;
      const rect = player.getBoundingClientRect();
      // Kích hoạt PiP nếu vị trí cuộn gần cuối trang (dưới 100px)

      if (scrollPosition - rect.height > -50) {
        handlePiP(true);
      } else {
        handlePiP(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);

    const handleFullscreenChange = () => {
      if (
        !document.fullscreenElement && // Kiểm tra nếu không có element nào trong fullscreen mode
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullscreenElement
      ) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange); // Cho trình duyệt Webkit
    document.addEventListener("mozfullscreenchange", handleFullscreenChange); // Cho Firefox
    document.addEventListener("MSFullscreenChange", handleFullscreenChange); // Cho IE/Edge

    // Push mouse to x2
    document.addEventListener("mouseup", handleSpeedChangeMouseUp);
    console.log("loop");

    return () => {
      document.removeEventListener("mouseup", handleSpeedChangeMouseUp);
      // fullscreen
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
      // others
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("progress", updateBuffered);
    };
  }, [isPlaying, wideMode, isFullscreen, isHoldingMouse, holdTimeout]);

  return (
    <div className="yurei-player-wrapper" ref={playerRef}>
      <div className={`yurei-pip-mode${isPip ? " active" : ""}`}></div>
      <div
        onMouseDown={handleSpeedChangeMouseDown}
        id="yurei-player"
        className={`yurei-player${isPip ? " pip-mode" : ""}`}
      >
        <div
          className={`holding-mouse-tooltip${isHoldingMouse ? " active" : ""}`}
        >
          <span className="holding-mouse-tooltip-text">Play 2x</span>
        </div>
        <VideoScreen
          playerRef={playerRef}
          videoRef={videoRef}
          Video={Video}
          setCurrentTime={setCurrentTime}
          setTotalTime={setTotalTime}
          togglePlayPause={togglePlayPause}
        />
        <ButtonHandle
          isLoading={isLoading}
          showPlayPauseIcon={showPlayPauseIcon}
          isPlaying={isPlaying}
          isPip={isPip}
          handlePlay={handlePlay}
        />

        <PiPButon readyToPlay={readyToPlay} handlePlay={handlePlay} />
        <VideoPlayerControls
          isMute={isMute}
          isPlaying={isPlaying}
          seekbarRef={seekbarRef}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          handlePlay={handlePlay}
          handleFullScreen={handleFullScreen}
          isFullscreen={isFullscreen}
          volumeRef={volumeRef}
          volume={volume}
          startDrag={startDrag}
          progress={progress}
          wideMode={wideMode}
          currentTime={currentTime}
          totalTime={totalTime}
          playbackRate={playbackRate}
          buffered={buffered}
          handleWide={handleWide}
          handleRewindForward={handleRewindForward}
          handleSpeedChange={handleSpeedChange}
          handleMute={handleMute}
        />
      </div>
    </div>
  );
};

export default Player;
