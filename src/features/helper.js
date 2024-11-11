import emailjs from "@emailjs/browser";

export const sendMail = async (params) => {
  // require, to_email, to_name, otp_code for OTP
  try {
    const result = await emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID, // service_id
      "template_dxnqicp", // template_id otp
      params,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY // user_id
    );
    return { success: true, data: result.text };
  } catch (error) {
    return { success: false, data: error.text };
  }
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const calculateExpirationDate = (period) => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + period); // Cộng thêm 'period' tháng
  return currentDate;
};

export const validateOTP = (otp, userId) => {
  // Kiểm tra độ dài
  if (otp.length < 6 || otp.length > 10) {
    return { valid: false, message: "OTP must be 6 to 10 characters long." };
  }

  // Kiểm tra không được trùng với userId
  if (otp === userId) {
    return { valid: false, message: "OTP cannot be the same as user ID." };
  }

  // Kiểm tra không phải chỉ là cùng một ký tự lặp lại
  const isRepeatingChars = otp.split("").every((char) => char === otp[0]);
  if (isRepeatingChars) {
    return { valid: false, message: "OTP cannot be repeating characters." };
  }

  // Kiểm tra không phải là dãy số liên tiếp
  const isSequential = (str) => {
    for (let i = 0; i < str.length - 1; i++) {
      if (parseInt(str[i]) + 1 !== parseInt(str[i + 1])) return false;
    }
    return true;
  };

  if (isSequential(otp) || isSequential(otp.split("").reverse().join(""))) {
    return { valid: false, message: "OTP cannot be sequential numbers." };
  }

  // Nếu tất cả các điều kiện đều đúng
  return { valid: true, message: "OTP is valid." };
};

export const getTime = (timestamp) => {
  const uploadTime = new Date(
    timestamp?.seconds ? timestamp?.seconds * 1000 : timestamp
  );
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

export const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const formatLevelText = (level) => {
  let levelText = "";
  switch (level) {
    case 1:
      levelText = "Free";
      break;
    case 2:
      levelText = "Premium";
      break;
    default:
      levelText = "UWN";
  }

  return levelText;
};

export const convertToExpirationDate = (timestamp, monthsToAdd = 1) => {
  const date = new Date(
    timestamp?.seconds ? timestamp?.seconds * 1000 : timestamp
  );
  date.setMonth(date.getMonth() + monthsToAdd); // Thêm số tháng vào thời gian
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Đảm bảo luôn có 2 chữ số
  const day = String(date.getDate()).padStart(2, "0"); // Đảm bảo luôn có 2 chữ số
  return `${year}/${month}/${day}`;
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

export const handleSortData = (myList, key, sortBy) => {
  const combinedList = [...myList.episodes, ...myList.videos];

  const sortedData = combinedList.sort((a, b) => {
    if (a[key].seconds !== b[key].seconds) {
      return sortBy === "desc"
        ? b[key].seconds - a[key].seconds
        : a[key].seconds - b[key].seconds;
    }
    return sortBy === "desc"
      ? b[key].nanoseconds - a[key].nanoseconds
      : a[key].nanoseconds - b[key].nanoseconds;
  });

  return sortedData;
};

export const validatePassword = (password) => {
  // Kiểm tra độ dài
  if (password.length < 8 || password.length > 32) {
    return { success: false, error: "Your password is too short!" };
  }

  // Kiểm tra ký tự hợp lệ (chấp nhận alphanumeric và ký tự đặc biệt)
  const validCharacters = /^[a-zA-Z0-9!@#$%^&*()_+-=~`]+$/;
  if (!validCharacters.test(password)) {
    return { success: false, error: "Your password is not valid!" };
  }

  // Biến kiểm tra các yêu cầu
  let hasUpperCase = false;
  let hasSpecialChar = false;
  let hasNumber = false;

  // Kiểm tra ký tự trùng lặp và số liên tiếp
  for (let i = 0; i < password.length; i++) {
    const char = password[i];

    // Kiểm tra ký tự trùng lặp
    if (i > 0 && char === password[i - 1]) {
      return {
        success: false,
        error: "Please do not use the same characters!",
      };
    }

    // Kiểm tra số liên tiếp
    if (
      i > 1 &&
      !isNaN(char) &&
      !isNaN(password[i - 1]) &&
      !isNaN(password[i - 2]) &&
      char - password[i - 1] === 1 &&
      password[i - 1] - password[i - 2] === 1
    ) {
      return {
        success: false,
        error: "Please do not use consecutive numbers.",
      };
    }

    // Kiểm tra chữ cái in hoa
    if (/[A-Z]/.test(char)) {
      hasUpperCase = true;
    }
    // Kiểm tra ký tự đặc biệt
    if (/[\W_]/.test(char)) {
      hasSpecialChar = true;
    }
    // Kiểm tra số
    if (/\d/.test(char)) {
      hasNumber = true;
    }
  }

  // Kiểm tra các yêu cầu
  if (!hasUpperCase) {
    return {
      success: false,
      error: "Password must contain at least one uppercase letter.",
    };
  }
  if (!hasSpecialChar) {
    return {
      success: false,
      error: "Password must contain at least one special character.",
    };
  }
  if (!hasNumber) {
    return {
      success: false,
      error: "Password must contain at least one number.",
    };
  }

  return { success: true };
};

export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const formatTimestamp = (timestamp, formatType) => {
  if (!timestamp || !formatType) return;
  const date = timestamp.toDate();

  // Định dạng ngày (Oct 11 (Fri))
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    weekday: "short",
  });

  // Định dạng giờ (20:57)
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  if (formatType === "date") {
    return dateFormatter.format(date);
  } else if (formatType === "time") {
    return timeFormatter.format(date);
  } else {
    throw new Error("Invalid format type. Use 'date' or 'time'.");
  }
};

export const formatTimePlayer = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hrs > 0) {
    return `${hrs.toString().padStart(1, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins.toString().padStart(1, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};
