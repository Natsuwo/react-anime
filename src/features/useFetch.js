import db, { auth } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  verifyBeforeUpdateEmail,
  signOut,
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
} from "firebase/firestore";

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
  const q = query(collection(db, document), limit(maxDoc));

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
    return { success: false, error: "User not found" };
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
