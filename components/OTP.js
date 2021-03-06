import { useForm } from "react-hook-form";
import authController from "../controllers/authController";
import { useRouter } from "next/router";
const OTP = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    const response = await authController.verifyCode(data.code);
    if (response.status === 200) return router.push("/user");
    if (response.status === 400)
      return setError("response", "Invalid code. Please try again.");
    if (response.status === 500)
      return setError("response", "Something went wrong. Please try again.");
  };

  return (
    <section className='bg-white max-w-[430px] 2xl:max-w-[600px] w-full rounded-xl shadow-lg'>
      <form
        className='p-8 flex flex-col items-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>
          Please enter the six-digits code generated by your Microsoft
          Authenticator App
        </h1>
        <div className='h-8 mt-6 2xl:mt-10 w-1/2 relative'>
          <input
            type='text'
            maxLength={6}
            className='w-full h-full relative text-center text-slate-700 font-bold text-4xl border-0 border-b border-b-slate-300 outline-none 2xl:text-6xl transition-all focus:border-b-slate-600'
            {...register("code", {
              required: true,
              maxLength: 6,
              minLength: 6,
            })}
          />
        </div>

        {errors.code && (
          <p className='text-red-500 text-center'>{errors.code.message}</p>
        )}
        <div className='w-full flex justify-center'>
          <button
            type='submit'
            className='w-full mt-5 2xl:mt-8 border-0 py-2 2xl:py-4 2xl:text-2xl font-semibold text-white tracking-[1px] rounded-md bg-slate-600 hover:cursor-pointer hover:bg-slate-800 transition-all'
          >
            Submit code
          </button>
        </div>
        {errors.response && (
          <p className='text-red-500 text-center mt-3 text-xl'>
            {errors.response.message}
          </p>
        )}
      </form>
    </section>
  );
};

export default OTP;
