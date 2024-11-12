import db, { auth } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
  orderBy,
  limit,
  serverTimestamp,
  startAfter,
  getCountFromServer,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const CreateDocument = async (document, userId, params) => {
  try {
    // const docRef = await addDoc(collection(db, document), params);
    const docRef = await setDoc(doc(db, document, userId), params);
    return { success: true, docRef };
  } catch (error) {
    return { success: false, error: error.message, errorCode: error.code };
  }
};

export const GetDocument = async (document, id) => {
  const docRef = doc(db, document, id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = { id, ...docSnap.data() };
      return { success: true, docs: data };
    } else {
      console.error("No such document!");
      return { success: true, docs: [] };
    }
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const getDoubleFind = async (document, find1, find2, maxDoc = false) => {
  try {
    // Kiểm tra điều kiện so sánh cho find1
    const find1Condition =
      find1[2] && Array.isArray(find1[1])
        ? "array-contains-any"
        : find1[2]
        ? "array-contains"
        : "==";

    // Kiểm tra điều kiện so sánh cho find2
    const find2Condition =
      find2[2] && Array.isArray(find2[1])
        ? "array-contains-any"
        : find2[2]
        ? "array-contains"
        : "==";

    // Tạo query
    const q = query(
      collection(db, document),
      where(find1[0], find1Condition, find1[1]),
      where(find2[0], find2Condition, find2[1]),
      maxDoc ? limit(maxDoc) : undefined
    );

    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!documents.length) {
      return { success: false, error: "Empty Docs" };
    }

    return { success: true, doc: documents };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const GetDocumentsByQuery = async (
  document,
  find,
  id = null,
  array = false,
  maxDoc = 12,
  sort = false,
  sort_field,
  sort_by
) => {
  try {
    let q;

    if (id) {
      q = sort
        ? query(
            collection(db, document),
            where(
              find,
              array
                ? Array.isArray(id)
                  ? "array-contains-any"
                  : "array-contains"
                : "==",
              id
            ),
            orderBy(sort_field, sort_by),
            limit(maxDoc)
          )
        : query(
            collection(db, document),
            where(
              find,
              array
                ? Array.isArray(id)
                  ? "array-contains-any"
                  : "array-contains"
                : "==",
              id
            ),
            limit(maxDoc)
          );
    } else {
      q = sort
        ? query(
            collection(db, document),
            orderBy(sort_field, sort_by),
            limit(maxDoc)
          )
        : query(collection(db, document), limit(maxDoc));
    }

    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, doc: documents };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const FetchDocInfinity = async (
  document,
  sort_field,
  sort_by,
  lastDoc,
  limitPerPage,
  find,
  id,
  array = false
) => {
  if (find && !id) return { success: false, error: "Id not found" };
  try {
    let q;

    if (lastDoc) {
      if (find) {
        q = query(
          collection(db, document),
          where(find, array ? "array-contains" : "==", id),
          orderBy(sort_field, sort_by),
          startAfter(lastDoc),
          limit(limitPerPage)
        );
      } else {
        q = query(
          collection(db, document),
          orderBy(sort_field, sort_by),
          startAfter(lastDoc),
          limit(limitPerPage)
        );
      }
    } else {
      if (find) {
        q = query(
          collection(db, document),
          where(find, array ? "array-contains" : "==", id),
          orderBy(sort_field, sort_by),
          limit(limitPerPage)
        );
      } else {
        q = query(
          collection(db, document),
          orderBy(sort_field, sort_by),
          limit(limitPerPage)
        );
      }
    }

    // Fetch dữ liệu
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { success: true, lastDoc: lastVisible, docs };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const GetAllSort = async (document, field, order_by, maxDoc) => {
  try {
    const q = query(
      collection(db, document),
      orderBy(field, order_by),
      limit(maxDoc)
    );
    const querySnapshot = await getDocs(q);

    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { success: true, doc: documents };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const FetchAllLimit = async (document, maxDoc) => {
  // Tạo truy vấn tới collection Category và áp dụng limit
  let q;
  if (document === "Categories") {
    q = query(
      collection(db, document),
      limit(maxDoc),
      orderBy("category_id", "asc")
    );
  } else {
    q = query(collection(db, document), limit(maxDoc));
  }

  const querySnapshot = await getDocs(q);
  const categories = [];

  querySnapshot.forEach((doc) => {
    categories.push({ id: doc.id, ...doc.data() });
  });

  return categories;
};

export const FireBaseSignUp = async ({
  email,
  password,
  userId,
  userMetaData,
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "UserMetaData", user.uid), {
      userId: userId,
      joined_date: serverTimestamp(),
      is_verified: false,
      ...userMetaData,
    });
    localStorage.setItem("USER_METADATA", JSON.stringify({}));
    sendEmailVerification(user);
    return { success: true, user };
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === "auth/email-already-in-use") {
      return { success: false, error: "Email đã tồn tại." };
    } else {
      return { success: false, error: error.message };
    }
  }
};

export const FireBaseSignIn = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    localStorage.setItem("USER_METADATA", JSON.stringify({}));
    return { success: true, user: userCredential.user };
  } catch (error) {
    if (error.code === "auth/invalid-credential") {
      error.message = "Email or password incorrect!";
    } else if (error.code === "auth/too-many-requests") {
      error.message = "Too Many Requests";
    } else if (error.code === "auth/wrong-password") {
      error.message = "Wrong Password!";
    }
    return { success: false, error: error.message, errorCode: error.code };
  }
};

export const CheckEmailVerification = async () => {
  const user = auth.currentUser;
  if (user) {
    await user.reload();
    if (user.emailVerified) {
      return { success: true };
    } else {
      return { success: false, error: "Your still not verify yet!!" };
    }
  }
};

export const SendMailAgain = async () => {
  const user = auth.currentUser;
  try {
    await sendEmailVerification(user);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message, errorCode: err.code };
  }
};

export const UpdateDocument = async (objUpdate, document, id) => {
  const newObjUpdate = {
    ...objUpdate,
    last_modified_date: serverTimestamp(),
  };

  try {
    const updateRef = doc(db, document, id);
    await updateDoc(updateRef, newObjUpdate);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message, errorCode: error.code };
  }
};

export const FetchDocument = async (document, uid) => {
  const userDoc = doc(db, document, uid);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    console.log("Không tìm thấy dữ liệu người dùng.");
  }
};

export const FetchSingleDocumentByKey = async (
  document,
  find,
  key,
  array = false
) => {
  const q = query(
    collection(db, document),
    where(find, array ? "array-contains" : "==", key),
    limit(1)
  );
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { success: true, id: doc.id, ...doc.data() };
  } else {
    return { success: false, error: "Document not found" };
  }
};

export const FetchResetPassword = async (email) => {
  const auth = getAuth(); // Khởi tạo Firebase Auth
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message, errorCode: error.code };
  }
};

export const FetchReAuthenticateUser = async (currentPassword) => {
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  try {
    await reauthenticateWithCredential(user, credential);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message, errorCode: error.code };
  }
};

export const FetchChangeUserEmail = async (newEmail) => {
  const user = auth.currentUser;
  try {
    await updateEmail(user, newEmail);
    await SendMailAgain(user);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message, errorCode: error.code };
  }
};

export const FetchChangePassword = async (newPassword) => {
  try {
    await updatePassword(auth.currentUser, newPassword);
    console.log("Password updated successfully!");
    return { success: true };
  } catch (error) {
    console.error("Error updating password:", error);
    return { success: false, error: error.message, errorCode: error.code };
  }
};

export const FetchMyList = async (myList) => {
  if (
    !myList ||
    Object.keys(myList).length === 0 ||
    (myList?.episodes?.length === 0 && myList?.videos?.length === 0)
  ) {
    return { success: false, error: "Not found My list" };
  }

  try {
    const videos = [];
    const episodes = [];

    if (myList?.videos?.length) {
      const videosRef = collection(db, "Videos");
      const videosQuery = query(
        videosRef,
        where("__name__", "in", myList?.videos)
      );
      const videosSnapshot = await getDocs(videosQuery);

      videosSnapshot.forEach((doc) => {
        videos.push({ id: doc.id, ...doc.data() });
      });
    }

    if (myList?.episodes?.length) {
      const EpisodeRef = collection(db, "Episode");
      const EpisodeQuery = query(
        EpisodeRef,
        where("__name__", "in", myList?.episodes)
      );
      const EpisodeSnapshot = await getDocs(EpisodeQuery);

      EpisodeSnapshot.forEach((doc) => {
        episodes.push({ id: doc.id, ...doc.data() });
      });
    }

    return { success: true, videos, episodes };
  } catch (error) {
    return { success: false, error: error.message, errorCode: error.code };
  }
};

// Hàm lấy số lượng tài liệu
export const getTotalResultsCount = async (keyword) => {
  const videoRef = collection(db, "Videos");
  const qTitle = query(
    videoRef,
    where("lower_title", ">=", keyword.toLowerCase()),
    where("lower_title", "<=", keyword.toLowerCase() + "\uf8ff")
  );
  const qDescription = query(
    videoRef,
    where("lower_description", ">=", keyword.toLowerCase()),
    where("lower_description", "<=", keyword.toLowerCase() + "\uf8ff")
  );

  const titleCountSnapshot = await getCountFromServer(qTitle);
  const titleCount = titleCountSnapshot.data().count;
  const descriptionCountSnapshot = await getCountFromServer(qDescription);
  const descriptionCount = descriptionCountSnapshot.data().count;

  return titleCount + descriptionCount;
};

const searchVideos = async (keyword) => {
  const videoRef = collection(db, "Videos");

  const qTitle = query(
    videoRef,
    where("lower_title", ">=", keyword),
    where("lower_title", "<=", keyword + "\uf8ff"),
    limit(8)
  );
  const videoSnapshotTitle = await getDocs(qTitle);
  const videosFromTitle = videoSnapshotTitle.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const qDescription = query(
    videoRef,
    where("lower_description", ">=", keyword),
    where("lower_description", "<=", keyword + "\uf8ff"),
    limit(8)
  );
  const videoSnapshotDescription = await getDocs(qDescription);
  const videosFromDescription = videoSnapshotDescription.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const videoMap = new Map();

  videosFromTitle.forEach((video) => {
    videoMap.set(video.id, video);
  });

  videosFromDescription.forEach((video) => {
    videoMap.set(video.id, video);
  });

  const uniqueVideos = Array.from(videoMap.values());

  return uniqueVideos;
};

export const getTotalEpisodesCount = async (videoList) => {
  const episodeRef = collection(db, "Episode");
  const videoIds = videoList.map((video) => video.id);

  // Tạo truy vấn đếm số tập
  const episodeQuery = query(episodeRef, where("video_id", "in", videoIds));

  const snapshot = await getCountFromServer(episodeQuery);
  return snapshot.data().count;
};

export const getLimitedEpisodes = async (videoList, episodeLimit = 8) => {
  const episodeRef = collection(db, "Episode");
  const episodeList = [];
  let totalFetched = 0;

  for (let video of videoList) {
    if (totalFetched >= episodeLimit) break;

    const remainingLimit = episodeLimit - totalFetched;
    const episodeQuery = query(
      episodeRef,
      where("video_id", "==", video.id),
      limit(remainingLimit)
    );

    const episodeSnapshot = await getDocs(episodeQuery);
    const episodes = episodeSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    episodeList.push(...episodes);
    totalFetched += episodes.length;
  }

  return episodeList;
};

export const fetchSearchResults = async (keyword) => {
  const [totalResults, videos] = await Promise.all([
    getTotalResultsCount(keyword),
    searchVideos(keyword),
  ]);
  return { totalResults, videos };
};

export const fetchEpisodesForVideos = async (videoList) => {
  const [totalEpisodesCount, episodes] = await Promise.all([
    getTotalEpisodesCount(videoList),
    getLimitedEpisodes(videoList, 8),
  ]);
  return { totalEpisodesCount, episodes };
};

export const fetchRecommendedVideos = async () => {
  const recommendRef = collection(db, "Videos");
  const recommendQuery = query(recommendRef, limit(20));
  const recommendSnapshot = await getDocs(recommendQuery);
  const docs = recommendSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return docs;
};

export const searchHandler = async (keyword) => {
  try {
    let { totalResults, videos } = await fetchSearchResults(keyword);
    let episodes = [];
    let totalEpisodesCount = 0;
    let existingVideoIds = new Set(videos.map((video) => video.id));

    if (videos.length > 0) {
      const { totalEpisodesCount: totalEp, episodes: EpiData } =
        await fetchEpisodesForVideos(videos);
      episodes = EpiData;
      totalEpisodesCount = totalEp;
      if (videos.length < 4) {
        const { doc: additionalVideos } = await GetDocumentsByQuery(
          "Videos",
          "category_id",
          videos[0].category_id,
          true,
          4
        );
        const filteredAdditionalVideos = additionalVideos.filter(
          (video) => !existingVideoIds.has(video.id)
        );
        videos = [...videos, ...filteredAdditionalVideos].slice(0, 4);
      }
    } else {
      videos = await fetchRecommendedVideos();
      return { success: true, videos, episodes: [], isRecommend: true };
    }

    return {
      success: true,
      videos,
      episodes,
      isRecommend: false,
      totalResults,
      totalEpisodesCount,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const saveWatchTime = async (
  userId,
  videoId,
  episodeId,
  watchTime,
  totalTime
) => {
  try {
    const userRef = doc(db, "UserMetaData", userId);
    const userDoc = await getDoc(userRef);
    const data = userDoc.exists() ? userDoc.data() : {};
    const updatedHistory = {
      ...data.history,
      [videoId]: {
        ...(data.history?.[videoId] || {}),
        [episodeId]: watchTime,
      },
    };

    await setDoc(userRef, { history: updatedHistory }, { merge: true });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchWatchTime = async (userId, videoId, episodeId) => {
  const userRef = doc(db, "UserMetaData", userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const history = userDoc.data().history || {};
    return history[videoId]?.[episodeId] || 0;
  }
  return 0;
};

export const fetchRandomWatchedEpisode = async (userId, videoId) => {
  const userRef = doc(db, "UserMetaData", userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const history = userDoc.data().history?.[videoId] || {};
    const episodeIds = Object.keys(history);

    if (episodeIds.length > 0) {
      // const randomEpisodeId =
      //   episodeIds[Math.floor(Math.random() * episodeIds.length)];
      // const watchTime = history[randomEpisodeId];

      const randomEpisodeId = episodeIds[episodeIds.length - 1];
      const watchTime = history[randomEpisodeId];
      return { episodeId: randomEpisodeId, watchTime };
    }
  }
  return null;
};

export const CreatePayment = async (
  userId,
  amount,
  vnd_amount,
  period,
  level
) => {
  try {
    const createAt = Date.now();
    const uid = uuidv4();
    const status = false;

    const params = {
      createAt,
      uid,
      status,
      userId,
      amount,
      vnd_amount,
      period,
      level,
    };
    const docRef = await addDoc(collection(db, "Payment"), params);
    return { success: true, uid, docId: docRef?.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getDocumentsByArray = async (document, keys) => {
  try {
    if (keys.length > 10) {
      console.error(
        "Firebase chỉ hỗ trợ tối đa 10 giá trị khi dùng toán tử 'in'"
      );
      return { success: false, error: "Limited 10 Posts" };
    }

    const q = query(collection(db, document), where("__name__", "in", keys));

    // Lấy dữ liệu từ Firestore
    const querySnapshot = await getDocs(q);
    const episodes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { success: true, docs: episodes };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
