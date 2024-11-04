import { useEffect, useState } from "react";
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

export const GetDocument = (document, id) => {
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    setLoading(true);
    const docRef = doc(db, document, id);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setValue(docSnap.data());
      } else {
        console.error("No such document!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [document, id]);
  return { value, loading };
};

export const GetDocumentsByQuery = (
  document,
  find,
  id = null,
  array = false,
  maxDoc = 12
) => {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, document),
        where(find, array ? "array-contains" : "==", id),
        limit(maxDoc)
      );
      const querySnapshot = await getDocs(q);

      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setValue(documents);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [document, id, array]);
  return { value, loading };
};

export const GetAllSort = (document, field, order_by, maxDoc) => {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    setLoading(true);
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

      setValue(documents);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [document, field]);
  return { value, loading };
};

export const FetchAllLimit = async (document, customLimit = 20) => {
  // Tạo truy vấn tới collection Category và áp dụng limit
  const q = query(collection(db, document), limit(customLimit));

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
  if (!myList || myList.length === 0) {
    return [];
  }

  try {
    const videosRef = collection(db, "Videos");
    const videosQuery = query(videosRef, where("__name__", "in", myList));
    const videosSnapshot = await getDocs(videosQuery);

    const videos = [];
    videosSnapshot.forEach((doc) => {
      videos.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, videos };
  } catch (error) {
    return { success: false, error: error.message, errorCode: error.code };
  }
};
