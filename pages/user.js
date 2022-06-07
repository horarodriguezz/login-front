import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState, useEffect } from "react";
import Loader from "../components/loader";
import useUser from "../hooks/useUser";
import authController from "../controllers/authController";
import { useRouter } from "next/router";

const User = () => {
  const [expires, setExpires] = useState(null);
  const [user, setToken] = useUser();
  const router = useRouter();
  dayjs.extend(relativeTime);

  useEffect(() => {
    const timer = setInterval(() => {
      if (user) {
        setExpires(dayjs(dayjs.unix(user.expires)).toNow(true));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [dayjs()]);

  const refreshToken = async () => {
    try {
      const response = await authController.refreshToken();

      if (response.status === 200) {
        setToken(response.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    authController.logOut();
    router.push("/login");
  };

  if (!user) {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <Loader />
      </div>
    );
  }
  if (user) {
    return (
      <main className='w-screen h-screen flex flex-col xl:flex-row'>
        <section className='h-1/2 xl:h-full w-full xl:w-1/2 p-8 md:p-16 flex flex-col justify-center'>
          <p className='text-3xl md:text-5xl 2xl:text-7xl font-bold text-center'>
            Welcome back!
          </p>
          <h1 className='text-2xl md:text-3xl 2xl:text-4xl md:text-center mt-6'>
            Your personal profile:
          </h1>
          <p className='mt-3 md:mt-8 2xl:mt-12 md:text-2xl 2xl:text-3xl'>
            <span className='font-semibold'>Email: </span>
            {user.email}
          </p>
          <p className='mt-3 md:mt-8 2xl:mt-12 md:text-2xl 2xl:text-3xl'>
            <span className='font-semibold'>First Name: </span>
            {user.firstName}
          </p>
          <p className='mt-3 md:mt-8 2xl:mt-12 md:text-2xl 2xl:text-3xl'>
            <span className='font-semibold'>Last Name: </span>
            {user.lastName}
          </p>
        </section>
        <section className='bg-slate-600 text-slate-100 h-1/2 xl:h-full xl:w-1/2 p-8 md:p-16 flex flex-col justify-center'>
          <h2 className='text-center text-2xl md:text-4xl 2xl:text-6xl font-semibold'>
            Your session expires in:
          </h2>
          <p className='text-center text-xl md:text-2xl 2xl:text-3xl md:mt-4'>
            {expires}
          </p>
          <div className='w-full flex justify-center'>
            <button
              type='submit'
              onClick={() => refreshToken()}
              className='w-full md:w-1/2 mt-5 md:mt-8 border-0 py-2 md:py-4 md:text-2xl font-semibold text-slate-600 tracking-[1px] rounded-md bg-white hover:cursor-pointer hover:opacity-75 transition-all'
            >
              Refresh Session
            </button>
          </div>
          <div className='w-full flex justify-center'>
            <button
              type='submit'
              onClick={() => logOut()}
              className='w-full md:w-1/2 mt-5 md:mt-8 border-0 py-2 md:py-4 md:text-2xl font-semibold text-slate-600 tracking-[1px] rounded-md bg-white hover:cursor-pointer hover:opacity-75 transition-all'
            >
              Log out
            </button>
          </div>
        </section>
      </main>
    );
  }
};

export default User;
