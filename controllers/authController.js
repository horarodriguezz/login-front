import axios from "axios";

const auth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
});

// auth.interceptors.request.use((config) => {
//   if (typeof window === "object") {
//     const token = window.localStorage.getItem
//     if (window.localStorage.getItem("token")) {
//       config.headers["Authorization"] = `Bearer ${window.localStorage.getItem(
//         "token"
//       )}`;
//     }
//     if (window.localStorage.getItem("refresh")) {
//       config.headers.refresh = window.localStorage.getItem("refresh");
//     }
//   }
// });

const authController = {
  login: async (email, password) => {
    try {
      const response = await auth.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      if (response.status === 202) {
        if (typeof window)
          window.localStorage.setItem("token", response.data.token);
        const { token, ...data } = response.data;
        data.status = response.status;
        return data;
      }

      if (response.status === 200) {
        if (typeof window)
          window.localStorage.setItem("token", response.data.token);

        return { status: 200 };
      }
    } catch (error) {
      return error.response;
    }
  },
  verifyCode: async (code) => {
    try {
      const response = await auth.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login/second-step`,
        { code },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        if (typeof window === "object") {
          window.localStorage.setItem("token", response.data.token);
          window.localStorage.setItem("refresh", response.data.refreshToken);
        }
      }

      return response;
    } catch (error) {
      return error.response;
    }
  },
  register: async (data) => {
    try {
      const { firstName, lastName, email, password } = data;
      const response = await auth.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
        { firstName, lastName, email, password }
      );

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
};

export default authController;
