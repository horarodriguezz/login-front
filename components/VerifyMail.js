import React from "react";

const VerifyMail = ({ setStep }) => {
  return (
    <section className='bg-white max-w-[430px] 2xl:max-w-[600px] w-full rounded-xl shadow-lg'>
      <div className='p-8'>
        <h1 className='text-xl text-center font-bold'>
          The email was not verified.
        </h1>
        <p className='text-lg mt-5 font-medium text-center'>
          The email that you provided was not verified, we just send an email
          for confirmation, please check your inbox.
        </p>
        <div className='w-full flex justify-center'>
          <button
            className='w-full mt-5 border-0 rounded-lg py-2 bg-slate-600 text-white font-semibold hover:cursor-pointer hover:opacity-75 transition-all'
            onClick={() => setStep(1)}
          >
            Go back to login
          </button>
        </div>
      </div>
    </section>
  );
};

export default VerifyMail;
