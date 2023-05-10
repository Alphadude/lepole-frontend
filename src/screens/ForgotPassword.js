import React, { useState } from 'react';
import { Link, } from 'react-router-dom';

import { Button } from '@deposits/ui-kit-react';
import { useForm } from 'react-hook-form';

import { LePoleLogo, BackArrow } from '../assets/icons';

import { supabase } from '../utils/supabaseConfig';
import { toast } from 'react-toastify';
import { H1 } from '../components/Headings';


const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);


  // const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitForgotPassword = handleSubmit(async (form) => {

    const redirectLink = `${window.location.origin}/reset-password`

    setIsSubmitting(true);
    const { data } = await supabase.auth.resetPasswordForEmail(form.email, {
      redirectTo: redirectLink
    });

    console.log(form.email);
    console.log(data);

    if (!data || []) {
      toast.success('Request sent. Check your mail for reset link. If not seen, check spam.');
      setIsSubmitting(false);
      reset();
    } else if (data) {
      toast.error(data?.message);
      setIsSubmitting(false);
    }
  })

  return (
    <div className="min-h-screen flex flex-col items-center lg:pb-8 bg-lepole-pattern bg-no-repeat bg-left-bottom bg-black/95 ">
      <section>
        <img src={LePoleLogo} alt="Le Pole logo" />
      </section>

      <section className="bg-white flex-1 lg:flex-initial w-full lg:max-w-[600px] h-fit p-6 lg:p-10 text-left rounded-t-2xl lg:rounded-lg">
        <Link to="/login">
          <img src={BackArrow} alt="back arrow" />
        </Link>

        <H1 className=" mt-11 lg:mt-4">Forgot Password</H1>
        <p className="text-black text-xs lg:text-base font-normal mt-1">
          Please enter your email address
        </p>

        <form onSubmit={submitForgotPassword} className="mt-10 lg:mt-4 grid grid-cols-1  gap-6">
          <div>
            <label className="block capitalize text-xs mb-1">
              email address
            </label>

            <input
              className="w-full border border-dark-3 rounded text-base p-3 focus:outline-0 focus:border-dark-2"
              type="email"
              placeholder="Enter email address"
              name="email"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <div className="text-red-400">Email must be valid</div>
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

export default ForgotPassword;
