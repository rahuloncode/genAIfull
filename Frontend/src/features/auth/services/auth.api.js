import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

//  register api
export const register = async ({ username, email, password }) => {
  try {
    const response = await api.post("/api/auth/register", {
      email,
      username,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);

    throw error.response?.data || error;
  }
};

// login api

export const login = async ({ email, password }) => {
  console.log(email, password);
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);

    throw error.response?.data || error;
  }
};

// logout api

export const logout = async () => {
  try {
    const response = await axios.get("/api/auth/logout");

    return response.data;
  } catch (error) {
    console.error("logout failed:", error);

    throw error.response?.data || error;
  }
};

//getProfile
export const getme = async () => {
  try {
    const response = await axios.get("/api/auth/getme");

    return response.data;
  } catch (error) {
    console.error("Profile fetch failed:", error);

    throw error.response?.data || error;
  }
};
