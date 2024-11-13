import { useEffect, useRef, useState } from "react";
import { auth } from "../firebase";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const initialUserLoaded = useRef(false);

  const signOut = async () => {
    await auth.signOut();
    setUser(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("USER_METADATA", JSON.stringify({}));
        setUser(user);
        initialUserLoaded.current = true; // Đã tải xong lần đầu tiên
      } else {
        if (initialUserLoaded.current) {
          setUser({ logout: true });
        } else {
          setUser(false);
        }

        initialUserLoaded.current = true;
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user?.logout) {
      setTimeout(() => {
        setUser(false);
      }, [300]);
    }
  }, [user?.logout]);

  return { user, signOut };
};

export default useAuth;
