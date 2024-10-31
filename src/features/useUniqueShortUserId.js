import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const useUniqueShortUserId = () => {
  useEffect(() => {
    const storedUserId = localStorage.getItem("USER_METADATA")
      ? JSON.parse(localStorage.getItem("USER_METADATA"))
      : null;
    if (!storedUserId || !storedUserId.userId) {
      // Tạo UUID và mã hóa thành Base64
      const uuid = uuidv4();
      const base64Id = btoa(uuid)
        .replace(/\//g, "_") // Thay ký tự đặc biệt
        .replace(/\+/g, "-") // Thay ký tự đặc biệt
        .substring(0, 14); // Giới hạn độ dài
      localStorage.setItem("USER_LIST", JSON.stringify([]));
      localStorage.setItem(
        "USER_METADATA",
        JSON.stringify({ userId: base64Id, subscription_level: 1 })
      );
      console.log("New unique user ID generated and saved:", base64Id);
    } else {
      console.log("User ID found:", storedUserId.userId);
    }
  }, []);
};

export default useUniqueShortUserId;
