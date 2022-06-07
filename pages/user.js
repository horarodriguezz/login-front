import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import { usersController } from "../controllers/usersController";
const User = () => {
  const [data, setData] = useState(null);

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
        setData({ email, firstName, lastName });
      } else {
        router.push("/login");
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <Loader />
      </div>
    );
  }
  if (data) {
    return (
      <main className='w-screen h-screen flex'>
        <section>
          <p>Welcome back</p>
        </section>
        <section></section>
      </main>
    );
  }
};

export default User;
