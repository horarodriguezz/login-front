import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../schemas/registerSchema";
import {
  UilUser,
  UilEnvelope,
  UilLockAlt,
  UilEye,
  UilEyeSlash,
} from "@iconscout/react-unicons";
import Link from "next/link";
import authController from "../controllers/authController";
import ConfirmEmailModal from "../components/confirmEmailModal";

const Register = () => {
  const [showPass, setShowPass] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await authController.register(data);

      if (response.status === 201) return setShowModal(true);

      setError("response", { message: response.message });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className='bg-slate-600 w-full min-h-screen h-auto flex flex-col justify-center items-center p-4'>
      <section className='bg-white max-w-[430px] 2xl:max-w-[600px] w-full rounded-xl shadow-lg'>
        <form className='p-8 2xl:p-16' onSubmit={handleSubmit(onSubmit)}>
          {errors.response && (
            <p className='text-red-500 text-center mb-3 text-xl'>
              {errors.response.message}
            </p>
          )}
          <p className='text-3xl 2xl:text-5xl font-semibold relative before:content-[""] before:absolute before:left-0 before:bottom-0 before:h-1 before:w-[32px] 2xl:before:w-[48px] before:bg-slate-600 before:rounded-3xl'>
            Register
          </p>
          <div className='h-16 mt-6 2xl:mt-10 w-full relative'>
            <input
              type='text'
              {...register("firstName", { required: true })}
              placeholder='Insert your name'
              className='w-full h-full relative py-0 px-9 text-slate-500 border-0 border-b border-b-slate-300 outline-none text-base 2xl:text-2xl transition-all focus:border-b-slate-600'
            />
            {errors.firstName && (
              <span className='text-sm text-red-500 font-regular'>
                {errors.firstName.message}
              </span>
            )}
            <UilUser className='absolute top-[50%] text-slate-600 text-2xl  translate-y-[-50%] left-0' />
          </div>
          <div className='h-16 mt-6 2xl:mt-10 w-full relative'>
            <input
              type='text'
              {...register("lastName", { required: true })}
              placeholder='Insert your last name'
              className='w-full h-full relative py-0 px-9 text-slate-500 border-0 border-b border-b-slate-300 outline-none text-base 2xl:text-2xl transition-all focus:border-b-slate-600'
            />
            {errors.lastName && (
              <span className='text-sm text-red-500 font-regular'>
                {errors.lastName.message}
              </span>
            )}
            <UilUser className='absolute top-[50%] text-slate-600 text-2xl  translate-y-[-50%] left-0' />
          </div>
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
            <input
              type='checkbox'
              id='conditions'
              {...register("conditions")}
              className='accent-slate-600 mr-2'
            />
            <label
              htmlFor='conditions'
              className='text-slate-500 text-sm 2xl:text-xl'
            >
              I accept all terms and conditions.
            </label>
          </div>
          <div className='w-full flex justify-center'>
            <button
              type='submit'
              className='w-full mt-5 2xl:mt-8 border-0 py-2 2xl:py-4 2xl:text-2xl font-semibold text-white tracking-[1px] rounded-md bg-slate-600 hover:cursor-pointer hover:bg-slate-800 transition-all'
            >
              Singup now
            </button>
          </div>
          <p className='mt-4 2xl:mt-6 text-center text-sm 2xl:text-xl'>
            Already have an account?{" "}
            <Link href='/login'>
              <a className='text-blue-600 underline underline-offset-1'>
                Login now
              </a>
            </Link>
          </p>
        </form>
      </section>
      {showModal && <ConfirmEmailModal />}
    </main>
  );
};

export default Register;
