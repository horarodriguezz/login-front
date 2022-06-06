import { useState } from "react";
import { useForm } from "react-hook-form";
import AuthController from "../controllers/auth";
import {
  UilEnvelope,
  UilLockAlt,
  UilEye,
  UilEyeSlash,
} from "@iconscout/react-unicons";

export default function Home() {
  const auth = new AuthController();
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <main className='bg-slate-600 w-full h-screen flex flex-col justify-center items-center p-4'>
      <section className='bg-white max-w-[430px] w-full rounded-xl shadow-lg'>
        <form className='p-8' onSubmit={handleSubmit(onSubmit)}>
          <p className='text-3xl font-semibold relative before:content-[""] before:absolute before:left-0 before:bottom-0 before:h-1 before:w-[32px] before:bg-slate-600 before:rounded-3xl'>
            Log In
          </p>
          <div className='h-12 mt-6 w-full relative'>
            <input
              type='email'
              {...register("email", { required: true })}
              placeholder='Insert an email'
              className='w-full h-full absolute py-0 px-9 text-slate-500 border-0 border-b border-b-slate-300 outline-none text-base transition-all focus:border-b-slate-600'
            />
            <UilEnvelope className='absolute top-[50%] text-slate-600 text-2xl translate-y-[-50%] left-0' />
          </div>
          <div className='h-12 mt-6 w-full relative'>
            <input
              type={showPass ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder='Insert your password'
              className='w-full h-full absolute text-slate-500 py-0 px-9 border-0 border-b border-b-slate-300 outline-none text-base transition-all focus:border-b-slate-600'
            />
            <UilLockAlt className='absolute top-[50%] text-slate-600 text-2xl translate-y-[-50%] left-0' />
            {!showPass && (
              <UilEye
                onClick={() => setShowPass(true)}
                className='absolute top-[50%] translate-y-[-50%] right-0 text-slate-600'
              />
            )}
            {showPass && (
              <UilEyeSlash
                onClick={() => setShowPass(false)}
                className='absolute top-[50%] translate-y-[-50%] right-0 text-slate-600'
              />
            )}
          </div>
          <div className='w-full mt-5 flex items-center'>
            <label htmlFor='remember' className='text-slate-500'>
              Remember me
            </label>
            <input
              type='checkbox'
              id='remember'
              className='accent-slate-600 ml-2'
            />
          </div>
          <div className='w-full flex justify-center'>
            <button
              type='submit'
              className='w-full mt-5 border-0 py-2 text-white font-medium tracking-[1px] rounded-md bg-slate-600 hover:cursor-pointer hover:bg-slate-800 transition-all'
            >
              Login Now
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
