import { useEffect, useState } from "react";
import db, { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";

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
  qry,
  id = null,
  array = false
) => {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, document),
        where(qry, array ? "array-contains" : "==", id)
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

    console.log("User registered:", user);
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
    console.log("User logged in:", userCredential.user);
    return true;
  } catch (error) {
    console.error("Error logging in:", error.message);
    return false;
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

export const UpdateDocument = (objUpdate, document, id) => {
  const newObjUpdate = {
    ...objUpdate,
    last_modified_date: serverTimestamp(),
  };

  try {
    const updateRef = doc(db, document, id);
    updateDoc(updateRef, newObjUpdate);
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
