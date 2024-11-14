const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");
require("dotenv").config(); // Đảm bảo dùng thư viện dotenv để lấy giá trị từ .env

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_MESSAGING_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
const {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  setDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
} = require("firebase/firestore");

function scheduledDate(period = 1) {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + period); // Cộng thêm 'period' tháng
  return currentDate;
}

// Hàm để chuyển đổi title và description thành chữ thường
const renameDocuments = async () => {
  try {
    // Tham chiếu tới collection "Video"
    const videoCollection = collection(db, "Episode");

    // Lấy toàn bộ document trong collection "Video"
    const snapshot = await getDocs(videoCollection);

    // Duyệt qua từng document
    for (const videoDoc of snapshot.docs) {
      const data = videoDoc.data();

      // Kiểm tra xem có các field title và description không
      // if (data.title && data.description) {
      //   const lowerTitle = data.title.toLowerCase();
      //   const lowerDescription = data.description.toLowerCase();

      //   // Tạo một object mới với các field cần cập nhật
      //   const updates = {
      //     lower_title: lowerTitle,
      //     lower_description: lowerDescription,
      //   };

      //   // Thực hiện cập nhật document với các field mới
      //   const videoDocRef = doc(db, "Videos", videoDoc.id);
      //   await updateDoc(videoDocRef, updates);

      //   console.log(`Updated document ID: ${videoDoc.id}`);
      // }
      let category_id = [];
      switch (data.video_id) {
        case "1C1lyYioR5JFapHTvBW8":
          category_id = [6];
          break;
        case "mwIdHgI2dqBKWxAcwwq5":
        case "xXSQT2Ln41ls8VssJXz2":
        case "UFoDTd4sJR1vSY3y3UQK":
        case "sqZOEKvj2I6SHLEAYyoG":
        case "pj6SCVsw9NIYrk0ZED5L":
        case "5gFkR7oDSeYKQT1BPo3c":
        case "DnWI7RalilBXbUan02KH":
          category_id = [4, 5];
          break;
        case "xAMCAAQZNSMECComD509":
          category_id = [7];
          break;
      }
      if (!data.category_id) {
        const updates = {
          category_id,
        };
        const videoDocRef = doc(db, "Episode", videoDoc.id);
        await updateDoc(videoDocRef, updates);
        console.log(`Updated document ID: ${videoDoc.id}`);
      }
    }

    console.log("All documents have been updated.");
  } catch (error) {
    console.error("Error updating documents:", error);
  }
};

// Gọi hàm renameDocuments để bắt đầu quá trình
renameDocuments();

const data = require("./db/Video.json");
const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");
const addData = async () => {
  for (const item of data) {
    // item.upload_date = firebase.firestore.Timestamp.fromDate(
    //   new Date("2024-11-30T10:00:00")
    // );
    // item.last_modified_date = firebase.firestore.Timestamp.fromDate(
    //   new Date("2024-11-30T10:00:00")
    // );

    item.upload_date = serverTimestamp();
    item.last_modified_date = serverTimestamp();
    const docRef = await addDoc(collection(db, "Videos"), item);
    console.log("Document written with ID: ", docRef.id);
  }
};

// addData();

const episode = require("./db/Episode.json");
const addEpisode = async () => {
  for (const item of episode) {
    // item.upload_date = firebase.firestore.Timestamp.fromDate(
    //   new Date("2024-11-30T10:00:00")
    // );
    // item.last_modified_date = firebase.firestore.Timestamp.fromDate(
    //   new Date("2024-11-30T10:00:00")
    // );

    item.upload_date = serverTimestamp();
    item.last_modified_date = serverTimestamp();
    const docRef = await addDoc(collection(db, "Episode"), item);
    console.log("Document written with ID: ", docRef.id);
  }
};

// addEpisode();
