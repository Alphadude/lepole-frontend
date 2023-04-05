import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@deposits/ui-kit-react';
import { LePoleLogo, BackArrow } from '../assets/icons';

const Verification = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const email = new URLSearchParams(document.location.search).get('email');

  return (
    <div className="min-h-screen flex flex-col items-center pb-8 bg-lepole-pattern bg-no-repeat bg-left-bottom bg-black/95 ">
      <section>
        <img src={LePoleLogo} alt="Le Pole logo" />
      </section>

      <section className="bg-white w-full max-w-[600px] h-fit lg:h-[420px] text-center px-6 pt-6 pb-8 lg:px-10 lg:pt-10 rounded-lg">
        <div className="flex justify-between items-center">
          <Link to="/login">
            <img src={BackArrow} alt="back arrow" />
          </Link>
        </div>

        <h1 className="text-black font-bold text-2xl mt-6 mb-2">
          Verify your account
        </h1>
        <p className="text-black text-base font-normal mb-1">
          Please click on the link sent to your email address
          <span className="font-bold"> {email}</span>
        </p>

        <p className="text-sm">
          This link expires after{' '}
          <span className="font-semibold">15 minutes</span>{' '}
        </p>

        <div className="mt-3">
          <Button
            className="!font-normal !bg-white !w-fit !border !border-primary-green !px-8 !text-primary-gray"
            size="xlarge"
          >
            Link not Received?{' '}
            <span className="text-primary-green font-semibold">
              {isSubmitting ? 'Resetting...' : 'Resend'}
            </span>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Verification;
