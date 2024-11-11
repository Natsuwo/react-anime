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
  query,
  orderBy,
  limit,
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
    const videoCollection = collection(db, "Videos");

    // Lấy toàn bộ document trong collection "Video"
    const snapshot = await getDocs(videoCollection);

    // Duyệt qua từng document
    for (const videoDoc of snapshot.docs) {
      const data = videoDoc.data();

      // Kiểm tra xem có các field title và description không
      if (data.title && data.description) {
        const lowerTitle = data.title.toLowerCase();
        const lowerDescription = data.description.toLowerCase();

        // Tạo một object mới với các field cần cập nhật
        const updates = {
          lower_title: lowerTitle,
          lower_description: lowerDescription,
        };

        // Thực hiện cập nhật document với các field mới
        const videoDocRef = doc(db, "Videos", videoDoc.id);
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
// renameDocuments();

const data = require("./db/videoScheduled.json");
const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");
const addData = async () => {
  for (const item of data) {
    item.upload_date = firebase.firestore.Timestamp.fromDate(
      new Date("2024-11-30T10:00:00")
    );
    const docRef = await addDoc(collection(db, "Videos"), item);
    console.log("Document written with ID: ", docRef.id);
  }
};

addData();
