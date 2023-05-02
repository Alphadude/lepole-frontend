import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Checkbox } from '@deposits/ui-kit-react';
import { useForm } from 'react-hook-form';

import { LePoleLogo } from '../assets/icons';

import { supabase } from '../utils/supabaseConfig';
import { toast } from 'react-toastify';

import { useCookies } from 'react-cookie';

import { H1 } from '../components/Headings';

const Login = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [keep, setKeep] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const loginUp = handleSubmit(async (data) => {
    setIsSubmitting(true);

    const res = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (res?.data?.user !== null && res?.error === null) {
      toast.success('Login successful.');

      setCookie(
        'user',
        JSON.stringify({
          id: res?.data?.session?.user?.id,
          token: res?.data?.session?.access_token,
          email: res?.data?.session?.user?.email,
          authStatus: res?.data?.session?.user?.role,
          role: res?.data?.session?.user?.user_metadata?.role,
          firstname: res?.data?.session?.user?.user_metadata?.firstname,
          lastname: res?.data?.session?.user?.user_metadata?.lastname,
          phone: res?.data?.session?.user?.user_metadata?.phone,
          wallet: res?.data?.session?.user?.user_metadata?.wallet,
        }),
      );

      setIsSubmitting(false);

      reset();

      navigate(`/dashboard/explore`);
    } else {
      toast.error(res?.error?.message);

      setIsSubmitting(false);
    }
  });

  return (
    <div className="min-h-screen flex flex-col items-center pb-8 bg-lepole-pattern bg-no-repeat bg-left-bottom bg-black/95 ">
      <section>
        <img src={LePoleLogo} alt="Le Pole logo" />
      </section>

      <section className="bg-white w-full max-w-[600px] h-fit p-6 lg:p-10 text-left rounded-lg">
        <H1 className="!text-3xl">Sign in</H1>
        <p className="text-black text-base font-normal mt-1">
          Please fill correctly
        </p>


        <form onSubmit={loginUp} className="mt-4 grid grid-cols-1  gap-6">
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

          <div>
            <label className="block capitalize text-xs mb-1">password</label>
            <input
              name="password"
              className="w-full border border-dark-3 rounded text-base p-3 focus:outline-0 focus:border-dark-2"
              type="password"
              placeholder="Enter password"
              {...register('password', {
                required: true,
                minLength: 8,
              })}
            />
            {errors.password && (
              <div className="text-red-400">Password must be more than 8!</div>
            )}
          </div>

          <div className="flex items-center">
            <Checkbox
              label="Keep me signed in"
              labelClass="text-gray-1 text-sm !font-openSans"
              size="14px"
              checked={keep}
              onChange={() => setKeep(!keep)}
            />
          </div>

          <div className="mt-3">
            <Button
              disabled={isSubmitting}
              className="!bg-primary-green !w-full !border-0 !px-8 !text-primary-white"
              size="xlarge"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
      </section>

      <section className="text-base mt-4">
        <Link className="flex" to="/register">
          <div className="text-primary-white">Don’t have an account?</div>{' '}
          <div className="ml-1 cursor-pointer text-white font-semibold">
            Create an account
          </div>
        </Link>

        <Link to="/forgot-password">
          <div className="mt-3 cursor-pointer text-white font-semibold text-center">
            Forgot Password?
          </div>
        </Link>
      </section>
    </div>
  );
};

export default Login;
