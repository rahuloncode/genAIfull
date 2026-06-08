import { createContext, useEffect, useState } from "react";
import { getme } from "./services/auth.api.js";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // start true

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getme();
        setUser(data.user);
        console.log(data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <authContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </authContext.Provider>
  );
};
