import { useState } from "react";
import { LoginForm } from "../components/loginForm";
import RegisterApp from "../components/registerApp";
import VerifyMail from "../components/VerifyMail";
import OTP from "../components/OTP";

export default function Home() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(null);
  return (
    <main className='bg-slate-600 w-full min-h-screen h-auto flex flex-col justify-center items-center p-4'>
      {step === 1 && <LoginForm setStep={setStep} setData={setData} />}
      {step === 2 && <VerifyMail setStep={setStep} />}
      {step === 3 && <RegisterApp data={data} setStep={setStep} />}
      {step === 4 && <OTP />}
    </main>
  );
}
