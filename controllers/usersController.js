import axios from "axios";

const users = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
});

export const usersController = {
  getUser: async (token, refreshToken) => {
    try {
      const response = await users.get("/users/get-user", {
        headers: {
          Authorization: `Bearer ${token}`,
          refresh: refreshToken,
        },
      });

      if (typeof window === "object") {
        window.localStorage.setItem("token", response.data.token);
        window.localStorage.setItem("refresh", response.data.refreshToken);
      }
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
