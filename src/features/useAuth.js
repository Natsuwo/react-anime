import { useEffect, useState } from "react";
import { auth } from "../firebase";

const useAuth = () => {
  const [user, setUser] = useState(null);

  const signOut = async () => {
    await auth.signOut();
    setUser(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return { user, signOut };
};

export default useAuth;
