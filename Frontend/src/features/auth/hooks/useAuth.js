import { useContext, useEffect } from "react";
import { authContext } from "../auth.context";
import { login, logout, register, getme } from "../services/auth.api.js";

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(authContext);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);

    try {
      const data = await login({ email, password });

      setUser(data.user);
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async ({ email, password, username }) => {
    setLoading(true);

    try {
      console.log(email);
      const data = await register({ email, password, username });
      setUser(data.user);
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logout();
      setUser(null);
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
