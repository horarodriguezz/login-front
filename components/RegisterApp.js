import { useEffect, useState } from "react";
import qrcode from "qrcode";
import Image from "next/image";
const RegisterApp = ({ data, setStep }) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const generateQrCode = async () => {
      try {
        const qrUrl = await qrcode.toDataURL(data);
        setUrl(qrUrl);
      } catch (error) {
        console.log(error);
      }
    };

    generateQrCode();
  }, []);

  return (
    <section className='bg-white max-w-5xl 2xl:max-w-[600px] w-full rounded-xl shadow-lg'>
      <div className='p-8'>
        <h1 className='text-center text-2xl font-bold'>
          Two factor authentication
        </h1>
        <p className='text-lg mt-4'>
          In order to protect your account from unauthorized access, we require
          both a password and possession of your phone to access your account.
          Please install Microsoft Authenticator App through the following steps
          for us to verify that you have possesion of your phone.
        </p>
        <ol className='mt-5'>
          <li>
            1. Install the Microsoft Authenticator App from{" "}
            <span className='font-bold'>IOS App Store/Android Play Store.</span>
          </li>
          <li>2. Open the Microsoft Authenticator App.</li>
          <li>
            3. Click <span className='font-bold'>I agree</span> for permissions
            to use the app.
          </li>
          <li>
            4. Click <span className='font-bold'>Scan a QR Code.</span>
          </li>
          <li>5. Scan the image below.</li>
        </ol>
        <div className='flex justify-center my-3'>
          {url && <Image src={url} width={130} height={130} />}
        </div>
        <p className='text-center'>
          When Microsoft Authenticator App displays a six-digit code, click the{" "}
          <span className='font-bold'>continue</span> button below.
        </p>
        <div className='w-full flex justify-center'>
          <button
            onClick={(e) => setStep(4)}
            type='button'
            className='w-full mt-5 2xl:mt-8 border-0 py-2 2xl:py-4 2xl:text-2xl font-semibold text-white tracking-[1px] rounded-md bg-slate-600 hover:cursor-pointer hover:bg-slate-800 transition-all'
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
};

export default RegisterApp;
