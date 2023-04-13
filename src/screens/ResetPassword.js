import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@deposits/ui-kit-react';
import { useForm } from 'react-hook-form';

import { LePoleLogo, BackArrow } from '../assets/icons';
// import { useCookies } from 'react-cookie';
import { supabase } from '../utils/supabaseConfig';
import { toast } from 'react-toastify';
import { H1 } from '../components/Headings';

const ResetPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const submitResetPassword = async (form) => {
    if (form.password !== form.confirm_password) {
      setError('confirm_password', { type: 'custom', message: 'Passwords dont match' });
      return
    }

    setIsSubmitting(true);
    const { data, error } = await supabase.auth.updateUser({
      password: form.password
    })


    if (data?.user && !error) {
      toast.success('Request sent.');
      setIsSubmitting(false);
      reset();
      navigate(`/login`);
    } else {
      toast.error(error?.message);
      setIsSubmitting(false);
    }
  }


  return (
    <div className="min-h-screen flex flex-col items-center lg:pb-8 bg-lepole-pattern bg-no-repeat bg-left-bottom bg-black/95 ">
      <section>
        <img src={LePoleLogo} alt="Le Pole logo" />
      </section>

      <section className="bg-white flex-1 w-full lg:max-w-[600px] h-fit p-6 lg:p-10 text-left rounded-t-2xl lg:rounded-lg">
        <Link to="/login">
          <img src={BackArrow} alt="back arrow" />
        </Link>

        <H1 className=" mt-11 lg:mt-4">Reset Password</H1>
        <p className="text-black text-xs lg:text-base font-normal mt-1">
          Please enter your new password
        </p>

        <form onSubmit={handleSubmit(submitResetPassword)} className="mt-10 lg:mt-4 grid grid-cols-1  gap-6">
          <div>
            <label className="block capitalize text-xs mb-1">
              New Password
            </label>
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
            <label className="block capitalize text-xs mb-1">
              Confirm New Password
            </label>
            <input
              name="confirm-password"
              className="w-full border border-dark-3 rounded text-base p-3 focus:outline-0 focus:border-dark-2"
              type="password"
              placeholder="Confirm New Password"
              {...register('confirm_password', {
                required: true,
                minLength: 8,
              })}
            />
            {errors.confirm_password && (
              <div className="text-red-400">{errors?.confirm_password?.message || 'Password must be more than 8!'}</div>
            )}
          </div>

          <div className="mt-2 lg:mt-3">
            <Button
              className="!bg-primary-green !w-full !border-0 !px-8 !text-primary-white"
              size="xlarge"
            >
              {isSubmitting ? 'Reseting Password...' : 'Reset Password'}
            </Button>
          </div>
        </form>

        <Link to="/login" className='lg:hidden'>
          <div className="mt-6 cursor-pointer text-renaissance-black text-center text-[14px] font-[600]">
            Back to Login
          </div>
        </Link>
      </section>

      <section className="text-base mt-4 hidden lg:block">
        <Link to="/login">
          <div className="mt-3 cursor-pointer text-white text-sm font-semibold">
            Back to Login
          </div>
        </Link>
      </section>
    </div>
  );
};

export default ResetPassword;
