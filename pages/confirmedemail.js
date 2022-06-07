import React from "react";
import { useRouter } from "next/router";
const ConfirmedMail = () => {
  const router = useRouter();

  return (
    <main className='bg-slate-600 w-full h-screen flex flex-col justify-center items-center p-4'>
      <section className='bg-white max-w-[430px] 2xl:max-w-[600px] w-full rounded-xl shadow-lg'>
        <div className='p-8'>
          <h1 className='text-2xl text-center font-bold'>
            Your email has been succesfully validated
          </h1>
          <div className='w-full flex justify-center'>
            <button
              className='w-full mt-5 border-0 rounded-lg py-2 bg-slate-600 text-white font-semibold hover:cursor-pointer hover:opacity-75 transition-all'
              onClick={() => router.push("/login")}
            >
              Go back to login
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConfirmedMail;
