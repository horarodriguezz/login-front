import axios from "axios";

const auth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
});

auth.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  const refreshToken = window.localStorage.getItem("refresh");
  if (refreshToken) {
    config.headers.refresh = refreshToken;
  }

  return config;
});

auth.interceptors.response.use((response) => {
  const { status } = response;

  if (status === 200 || status === 202) {
    if (response.data?.token)
      window.localStorage.setItem("token", response.data.token);
    if (response.data?.refreshToken)
      window.localStorage.setItem("refresh", response.data.refreshToken);
  }

  return response;
});

const authController = {
  login: async (email, password) => {
    try {
      const response = await auth.post(`/auth/login`, {
        email,
        password,
      });

      if (response.status === 202) {
        const { token, ...data } = response.data;
        data.status = response.status;
        return data;
      }

      if (response.status === 200) return { status: 200 };
    } catch (error) {
      return error.response;
    }
  },
  verifyCode: async (code) => {
    try {
      const response = await auth.post(`/auth/login/second-step`, { code });

      return response;
    } catch (error) {
      return error.response;
    }
  },
  register: async (data) => {
    try {
      const { firstName, lastName, email, password } = data;
      const response = await auth.post(`/auth/register`, {
        firstName,
        lastName,
        email,
        password,
      });

      return response;
    } catch (error) {
      if (error.response.status === 400)
        return { status: 400, message: "Email already in use." };
      return {
        status: 500,
        message: "An error ocurred while the registration.",
      };
    }
  },
  refreshToken: async () => {
    try {
      const response = await auth.get("/auth/refresh-token");

      return response;
    } catch (error) {
      return error.response;
    }
  },
  logOut: () => {
    try {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("refresh");
    } catch (error) {
      console.log(error);
    }
  },
};

export default authController;
