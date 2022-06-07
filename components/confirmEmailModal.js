import { useRouter } from "next/router";

const ConfirmEmailModal = () => {
  const router = useRouter();

  return (
    <div className='w-screen h-screen fixed bg-gray-900 bg-opacity-50 flex justify-center items-center'>
      <div className='w-full max-w-[500px] flex flex-col items-center bg-slate-100 p-8 rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold text-center'>Confirm your email.</h1>
        <p className='text-lg text-center mt-5'>
          Please check your inbox for confirmation.
        </p>
        <button
          onClick={() => router.push("/login")}
          className='w-full py-2 bg-slate-600 text-white text-lg font-semibold hover:cursor-pointer rounded-lg mt-5'
        >
          Go back to login
        </button>
      </div>
    </div>
  );
};

export default ConfirmEmailModal;
