import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@deposits/ui-kit-react';
import { useForm } from 'react-hook-form';

import { LePoleLogo } from '../assets/icons';

import { supabase } from '../utils/supabaseConfig';
import { toast } from 'react-toastify';

import { H1 } from '../components/Headings';

const Register = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const watchPassword = watch('password', '');

  const eightCharsOrMore = /.{8,}/g; // eight characters or more
  const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
  const atLeastOneSpecialChar = /[#$@!-%&*?{}^_+()]/g; // any of the special characters within the square brackets
  const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9

  const passwordTracker = {
    uppercase: watchPassword.match(atLeastOneUppercase),
    number: watchPassword.match(atLeastOneNumeric),
    specialChar: watchPassword.match(atLeastOneSpecialChar),
    eightCharsOrGreater: watchPassword.match(eightCharsOrMore),
  };

  const PasswordChecker = ({ text, checker }) => {
    return (
      <span
        className={`${
          checker ? ' text-gray-2/50 line-through' : 'text-gray-2 '
        } block text-xs`}
      >
        {text}
      </span>
    );
  };

  const signUp = handleSubmit(async (data) => {
    setIsSubmitting(true);

    const res = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      phone: data.phone,
      confirmpassword: data.confirmpassword,
      options: {
        emailRedirectTo: 'https://le-pole-frontend.vercel.app/dashboard/login',
        data: {
          firstname: data.firstName,
          lastname: data.lastName,
          phone: data.phone,
          wallet: 0,
          role: 'user',
        },
      },
    });

    if (res?.data?.user !== null && res?.error === null) {
      toast.success('Sign up successful.');
      reset();
      setIsSubmitting(false);

      navigate(`/verification?email=${res?.data?.user?.email}`);
    } else {
      setIsSubmitting(false);
    }
  });

  return (
    <div className="min-h-screen bg-lepole-pattern bg-no-repeat bg-left-bottom bg-black/95 flex flex-col items-center pb-8">
      <section>
        <img src={LePoleLogo} alt="Le Pole logo" />
      </section>

      <section className="bg-white xl:w-[600px] xl:min-h-[600px] p-6 lg:p-10 text-left rounded-lg">
        <H1 className="!text-3xl">Create an account</H1>
        <p className="text-black text-base font-normal mt-1">
          Create an account to start booking for your gym sessions
        </p>

        <form
          onSubmit={signUp}
          className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div>
            <label className="block capitalize text-xs mb-1">first name</label>

            <input
              className="w-full border border-dark-3 rounded text-base p-3 focus:outline-0 focus:border-dark-2"
              type="text"
              placeholder="Enter first name"
              name="firstName"
              {...register('firstName', { required: true })}
            />
            {errors.firstName && (
              <div className="text-red-400 text-xs mt-1">
                First name cannot be empty
              </div>
            )}
          </div>

          <div>
            <label className="block capitalize text-xs mb-1">last name</label>

            <input
              className="w-full border border-dark-3 rounded text-base p-3 focus:outline-0 focus:border-dark-2"
              type="text"
              placeholder="Enter last name"
              name="firstName"
              {...register('lastName', { required: true })}
            />
            {errors.lastName && (
              <div className="text-red-400 text-xs mt-1">
                Last name cannot be empty
              </div>
            )}
          </div>

          <div>
            <label className="block capitalize text-xs mb-1">
              email address
            </label>

            <input
              className="w-full border border-dark-3 rounded text-base p-3 focus:outline-0 focus:border-dark-2"
              type="email"
              placeholder="Enter email address"
              name="email"
              {...register('email', {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              })}
            />
            {errors.email && (
              <div className="text-red-400 text-xs mt-1">
                Email must be valid
              </div>
            )}
          </div>

          <div>
            <label className="block capitalize text-xs mb-1">
              phone number
            </label>

            <input
              className="w-full border border-dark-3 rounded text-base p-3 focus:outline-0 focus:border-dark-2"
              type="tel"
              placeholder="Enter phone number"
              name="phone"
              {...register('phone', {
                required: true,
                pattern: /^[0-9]*$/,
              })}
            />
            {errors.phone && (
              <div className="text-red-400 text-xs mt-1">
                Phone must be valid
              </div>
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
                pattern:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?{}^_+()])[A-Za-z\d#$@!%&*?{}^_+()]{8,30}$/,
              })}
            />
            {errors.password && (
              <div className="text-red-400 text-xs mt-1">
                Password must pass all checks to be valid
              </div>
            )}

            <div className="col-span-1 mt-1">
              <PasswordChecker
                text="minimum of 8 character long"
                checker={passwordTracker.eightCharsOrGreater}
              />
              <PasswordChecker
                text="at least one capital letter"
                checker={passwordTracker.uppercase}
              />
              <PasswordChecker
                text="at least one symbol"
                checker={passwordTracker.specialChar}
              />
              <PasswordChecker
                text="at least one number"
                checker={passwordTracker.number}
              />
            </div>
          </div>

          <div>
            <label className="block capitalize text-xs mb-1">
              confirm password
            </label>
            <input
              name="confirmpassword"
              className="w-full border border-dark-3 rounded text-base p-3 focus:outline-0 focus:border-dark-2"
              type="password"
              placeholder="Confirm password"
              {...register('confirmpassword', {
                required: true,
                minLength: 8,
                validate: (value) =>
                  value === watchPassword || 'The passwords do not match',
              })}
            />
            {errors.confirmpassword && (
              <div className="text-red-400 text-xs mt-1">
                Password must be a match
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs text-black mb-2">
              By clicking Create an account, you accept our Terms and Conditions
              and Privacy Policy.
            </p>

            <Button
              disabled={isSubmitting}
              className="!bg-primary-green !w-full !border-0 !px-8 !text-primary-white"
              size="xlarge"
            >
              {isSubmitting ? 'Creating...' : 'Create an Account'}
            </Button>
          </div>
        </form>
      </section>

      <section className="text-base mt-4">
        <Link className="flex" to="/login">
          <div className="text-primary-white">Already have an account?</div>{' '}
          <div className="ml-1 cursor-pointer text-white font-semibold">
            Sign In
          </div>
        </Link>
      </section>
    </div>
  );
};

export default Register;
