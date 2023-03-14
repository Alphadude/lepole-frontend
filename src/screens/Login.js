import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Checkbox } from '@deposits/ui-kit-react';
import { useForm } from 'react-hook-form';

import { LePoleLogo } from '../assets/icons';

const Login = () => {
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
        <h1 className="text-black font-bold text-3xl">Sign in</h1>
        <p className="text-black text-base font-normal mt-1">
          Please fill correctly
        </p>

        <form className="mt-4 grid grid-cols-1  gap-6">
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
              className="!bg-primary-green !w-full !border-0 !px-8 !text-primary-white"
              size="xlarge"
            >
              {isSubmitting ? 'Signing...' : 'Sign in'}
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
          <div className="mt-3 cursor-pointer text-white font-semibold">
            Forgot Password?
          </div>
        </Link>
      </section>
    </div>
  );
};

export default Login;
