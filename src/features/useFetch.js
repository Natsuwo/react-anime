import { useEffect, useState } from "react";
import db from "../firebase";
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  orderBy,
  limit,
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
      console.log(err);
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
