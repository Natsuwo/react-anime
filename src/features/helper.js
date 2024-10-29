export const getTime = (timestamp) => {
  const uploadTime = new Date(timestamp?.seconds * 1000);
  const timeElapsed = Date.now() - uploadTime.getTime();
  const secondsElapsed = Math.floor(timeElapsed / 1000);
  const formatTimeElapsed = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(seconds / 86400);
    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    } else if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  };
  const timeAgo = formatTimeElapsed(secondsElapsed);
  return timeAgo;
};

export const getDays = (timestamp) => {
  const uploadTime = new Date(timestamp?.seconds * 1000);
  const timeElapsed = Date.now() - uploadTime.getTime();
  const secondsElapsed = Math.floor(timeElapsed / 1000);
  const formatTimeElapsed = (seconds) => {
    const days = Math.floor(seconds / 86400);
    return days;
  };
  const timeDay = formatTimeElapsed(secondsElapsed);
  return timeDay;
};

export const formatViews = (views) => {
  if (views < 1000) return views; // Không cần định dạng nếu dưới 1000
  const k = 1000;
  const m = 1000000;
  const b = 1000000000;

  if (views >= m) {
    return (views / m).toFixed(1).replace(/\.0$/, "") + "m"; // 1m, 2.5m
  } else if (views >= k) {
    return (views / k).toFixed(1).replace(/\.0$/, "") + "k"; // 80k, 800k
  } else if (views >= b) {
    return (views / k).toFixed(1).replace(/\.0$/, "") + "b"; // 80k, 800k
  }
};
