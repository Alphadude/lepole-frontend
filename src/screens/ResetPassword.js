import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Checkbox } from '@deposits/ui-kit-react';
import { useForm } from 'react-hook-form';

import { LePoleLogo } from '../assets/icons';
import { BackArrow } from '../assets/icons';

const ResetPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [keep, setKeep] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="min-h-screen flex flex-col items-center pb-8 bg-lepole-pattern bg-no-repeat bg-left-bottom bg-black/95 ">
      <section>
        <img src={LePoleLogo} alt="Le Pole logo" />
      </section>

      <section className="bg-white w-full max-w-[600px] h-fit p-6 lg:p-10 text-left rounded-lg">

        <Link to="/login">
          <img src={BackArrow} alt="back arrow" />
        </Link>

        <h1 className="text-black font-bold text-3xl mt-4">Reset Password</h1>
        <p className="text-black text-base font-normal mt-1">
          Please enter your new password
        </p>

        <form className="mt-4 grid grid-cols-1  gap-6">
           <div>
            <label className="block capitalize text-xs mb-1">New Password</label>
            <input
              name="password"
              className="w-full border border-dark-3 rounded text-base p-3 focus:outline-0 focus:border-dark-2"
              type="password"
              placeholder="New password"
              {...register('password', {
                required: true,
                minLength: 8,
              })}
            />
            {errors.password && (
              <div className="text-red-400">Password must be more than 8!</div>
            )}
          </div>

           <div>
            <label className="block capitalize text-xs mb-1">Confirm New Password</label>
            <input
              name="confirm-password"
              className="w-full border border-dark-3 rounded text-base p-3 focus:outline-0 focus:border-dark-2"
              type="password"
              placeholder="Confirm New Password"
              {...register('confirm-password', {
                required: true,
                minLength: 8,
              })}
            />
            {errors.password && (
              <div className="text-red-400">Password must be more than 8!</div>
            )}
          </div>

          <div className="mt-3">
            <Button
              className="!bg-primary-green !w-full !border-0 !px-8 !text-primary-white"
              size="xlarge"
            >
              {isSubmitting ? 'Reseting Password' : 'Reset Password'}
            </Button>
          </div>
        </form>
      </section>

      <section className="text-base mt-0">
        <Link to="/login">
          <div className="mt-3 cursor-pointer text-white text-[14px] font-[600]">
            Back to Login
          </div>
        </Link>
      </section>

    </div>
  );
};

export default ResetPassword;
