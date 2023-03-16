import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@deposits/ui-kit-react';
import { LePoleLogo, BackArrow } from '../assets/icons';

import OtpInput from 'react18-input-otp';

const Verification = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [OTP, setOTP] = useState('');

  useEffect(() => {
    if (OTP.length === 6) {
      navigate('/login');
    }
  }, [OTP.length, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center pb-8 bg-lepole-pattern bg-no-repeat bg-left-bottom bg-black/95 ">
      <section>
        <img src={LePoleLogo} alt="Le Pole logo" />
      </section>

      <section className="bg-white w-full max-w-[600px] text-center h-fit px-6 pt-6 pb-8 lg:px-10 lg:pt-10 rounded-lg">
        <div className="flex justify-between items-center">
          <Link to="/login">
            <img src={BackArrow} alt="back arrow" />
          </Link>
          <div className="font-bold underline text-dark-1 cursor-pointer">
            Change Email
          </div>
        </div>

        <h1 className="text-black font-bold text-2xl mt-6 ">
          Enter authentication code
        </h1>
        <p className="text-black text-base font-normal my-2">
          Enter the 6-digit that we have sent via email
          <span className="font-bold"> lepolegym@company.com</span>
        </p>

        <p className="text-sm">This code expires after 15 minutes</p>

        <div className="my-3 flex items-center justify-center">
          <OtpInput
            value={OTP}
            onChange={(OTP) => setOTP(OTP)}
            numInputs={6}
            inputStyle="otp_alt_style"
            containerStyle="otp_input"
            focusStyle="otp_style_focus "
            errorStyle="border border-red-400"
          />
        </div>

        <div className="mt-3">
          <Button
            className="!bg-white !w-fit !border !border-primary-green !px-8 !text-primary-gray"
            size="xlarge"
          >
            Code not Received?{' '}
            <span className="text-primary-green">
              {isSubmitting ? 'Resetting...' : 'Resend'}
            </span>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Verification;
