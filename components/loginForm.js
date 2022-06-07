import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schemas/loginSchema";
import AuthController from "../controllers/authController";

import {
  UilEnvelope,
  UilLockAlt,
  UilEye,
  UilEyeSlash,
} from "@iconscout/react-unicons";
import Link from "next/link";

export const LoginForm = ({ setStep, setData }) => {
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
    reValidateMode: "onBlur",
    defaultValues: {
      email:
        typeof window === "object" ? window.localStorage.getItem("email") : "",
      remember:
        typeof window === "object" && window.localStorage.getItem("email")
          ? true
          : false,
    },
  });

  const onSubmit = async (data) => {
    const { email, password, remember } = data;

    if (remember) {
      if (typeof window) window.localStorage.setItem("email", email);
    }

    if (!remember) {
      if (typeof window) window.localStorage.removeItem("email");
    }

    const response = await AuthController.login(email, password);

    if (response.status === 400) {
      return setError("response", { message: response.data.message });
    }
    if (response.status === 401) return setStep(2);
    if (response.status === 202) {
      setStep(3);
      setData(response.otpauthUrl);
      return;
    }
    if (response.status === 200) return setStep(4);
  };

  return (
    <section className='bg-white max-w-[430px] 2xl:max-w-[600px] w-full rounded-xl shadow-lg'>
      <form className='p-8 2xl:p-16' onSubmit={handleSubmit(onSubmit)}>
        {errors.response && (
          <p className='text-red-500 text-center mb-3 text-xl'>
            {errors.response.message}
          </p>
        )}
        <p className='text-3xl 2xl:text-5xl font-semibold relative before:content-[""] before:absolute before:left-0 before:bottom-0 before:h-1 before:w-[32px] 2xl:before:w-[48px] before:bg-slate-600 before:rounded-3xl'>
          Login
        </p>
        <div className='h-16 mt-6 2xl:mt-10 w-full relative'>
          <input
            type='text'
            {...register("email", { required: true })}
            placeholder='Insert an email'
            className='w-full h-full relative py-0 px-9 text-slate-500 border-0 border-b border-b-slate-300 outline-none text-base 2xl:text-2xl transition-all focus:border-b-slate-600'
          />
          {errors.email && (
            <span className='text-sm text-red-500 font-regular'>
              {errors.email.message}
            </span>
          )}
          <UilEnvelope className='absolute top-[50%] text-slate-600 text-2xl  translate-y-[-50%] left-0' />
        </div>
        <div className='h-12 mt-6 2xl:mt-10 w-full relative'>
          <input
            type={showPass ? "text" : "password"}
            {...register("password", { required: true })}
            placeholder='Insert your password'
            className='w-full h-full relative text-slate-500 py-0 px-9 border-0 border-b 2xl:text-2xl border-b-slate-300 outline-none text-base transition-all focus:border-b-slate-600'
          />
          <UilLockAlt className='absolute top-[50%] text-slate-600 text-2xl translate-y-[-50%] left-0' />
          {!showPass && (
            <UilEye
              onClick={() => setShowPass(true)}
              className='absolute top-[50%] translate-y-[-50%] right-0 text-slate-600 hover:cursor-pointer'
            />
          )}
          {showPass && (
            <UilEyeSlash
              onClick={() => setShowPass(false)}
              className='absolute top-[50%] translate-y-[-50%] right-0 text-slate-600 hover:cursor-pointer'
            />
          )}
        </div>
        {errors.password && (
          <p className='text-sm text-red-500 font-light mt-1'>
            {errors.password.message}
          </p>
        )}
        <div className='w-full mt-5 2xl:mt-8 flex items-center'>
          <label
            htmlFor='remember'
            className='text-slate-500 text-sm 2xl:text-xl'
          >
            Remember me
          </label>
          <input
            type='checkbox'
            id='remember'
            {...register("remember")}
            className='accent-slate-600 ml-2'
          />
        </div>
        <div className='w-full flex justify-center'>
          <button
            type='submit'
            className='w-full mt-5 2xl:mt-8 border-0 py-2 2xl:py-4 2xl:text-2xl font-semibold text-white tracking-[1px] rounded-md bg-slate-600 hover:cursor-pointer hover:bg-slate-800 transition-all'
          >
            Login Now
          </button>
        </div>
        <p className='mt-4 2xl:mt-6 text-center text-sm 2xl:text-xl'>
          Don&#39;t have an account?{" "}
          <Link href='/register'>
            <a className='text-blue-600 underline underline-offset-1'>
              Sing up now
            </a>
          </Link>
        </p>
      </form>
    </section>
  );
};

export default LoginForm;
