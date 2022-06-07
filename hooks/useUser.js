import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { usersController } from "../controllers/usersController";
import jwtDecode from "jwt-decode";

const useUser = () => {
  const [data, setData] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = window.localStorage.getItem("token");
      const refresh = window.localStorage.getItem("refresh");

      if (!token || !refresh) {
        router.push("/login");
      }

      const response = await usersController.getUser(token, refresh);
      if (response.status === 200 || response.status === 304) {
        const { email, firstName, lastName } = response.data;
        const { exp } = jwtDecode(token);
        setData({ email, firstName, lastName, expires: exp });
      } else {
        router.push("/login");
      }
    };

    fetchData();
  }, [token]);
  return [data, setToken];
};

export default useUser;
