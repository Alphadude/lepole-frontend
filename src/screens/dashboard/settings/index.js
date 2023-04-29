import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { H1, H2, H5 } from '../../../components/Headings';
import { TextField, Button } from '@deposits/ui-kit-react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { supabase } from '../../../utils/supabaseConfig';
import { toast } from 'react-toastify';

const Settings = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const [cookies] = useCookies(['user']);

  const firstname = cookies?.user?.firstname;

  const lastname = cookies?.user?.lastname;

  const email = cookies?.user?.email;

  const phoneNumber = cookies?.user?.phone;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const watchPassword = watch('password', '');

  const eightCharsOrMore = /.{8,}/g; // eight characters or more
  const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
  const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets
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
          checker ? 'text-primary-green' : 'text-gray-2 '
        } block text-xs`}
      >
        {text}
      </span>
    );
  };

  const updatePassword = handleSubmit(async (data) => {
    setIsSubmitting(true);

    console.log(data.password);
    
   const res = await supabase.auth.updateUser({password: data.password});

   console.log(res);

   if (res?.data?.user !== null && res?.error === null) {
      toast.success('Password Update successful.');

      setIsSubmitting(false);

      reset();

      // navigate(`/dashboard/settings`);
    } else {
      toast.error('Password Update Not Successful.');

      setIsSubmitting(false);
    }

 });

  return (
    <section className="p-6 lg:px-6 xl:px-12 lg:py-10">
      <H2 className="mb-10 hidden dark:text-renaissance-dark-black lg:block font-bold text-xl lg:text-xl text-renaissance-black">
        Account Settings
      </H2>

      <div className="mb-[40px] flex items-center">
        <div className="w-[80px] h-[80px] text-3xl mr-2 rounded-full bg-avatarBg text-avatarText flex items-center justify-center ">
          {firstname[0]}{lastname[0]}
        </div>
        <H2 className="dark:text-renaissance-dark-black lg:block font-bold text-lg lg:text-2xl text-renaissance-black">
          {firstname} {lastname}
        </H2>
      </div>

      <H1 className="dark:text-renaissance-dark-black lg:block font-bold text-lg lg:text-xl text-renaissance-black mb-5">
        Personal Information
      </H1>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <H5 className="dark:text-gray-2 lg:block font-medium lg:text-sm text-grey-6">
            First Name
          </H5>
          <H5 className="dark:text-renaissance-dark-black lg:block font-medium lg:text-sm text-renaissance-black">
            {firstname}
          </H5>
        </div>

        <div>
          <H5 className="dark:text-gray-2 lg:block font-medium lg:text-sm text-grey-6">
            Last Name
          </H5>
          <H5 className="dark:text-renaissance-dark-black lg:block font-medium lg:text-sm text-renaissance-black">
            {lastname}
          </H5>
        </div>

        <div>
          <H5 className="dark:text-gray-2 lg:block font-medium lg:text-sm text-grey-6">
            Email Address
          </H5>
          <H5 className="dark:text-renaissance-dark-black lg:block font-medium lg:text-sm text-renaissance-black">
            {email}
          </H5>
        </div>

        <div>
          <H5 className="dark:text-gray-2 lg:block font-medium lg:text-sm text-grey-6">
            Phone Number
          </H5>
          <H5 className="dark:text-renaissance-dark-black lg:block font-medium lg:text-sm text-renaissance-black">
            {phoneNumber}
          </H5>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-4">
        
      </div>

      <hr className="my-8" />

      <H1 className="mb-5 dark:text-renaissance-dark-black lg:block font-bold text-lg lg:text-xl text-renaissance-black">
        Change password
      </H1>

      <form onSubmit={updatePassword}>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-x-8 gap-y-4">
            <div>
            <label className="dark:text-renaissance-dark-black lg:block font-medium lg:text-sm text-renaissance-black">
              New Password
            </label>
            

          <input
              name="password"
              type="password"
              className="mt-2 text-base placeholder-[#B8C4CE] font-normal rounded w-[340px] h-[56px] px-2 py-2 border border-[#CED6DE] focus:outline-0 focus:border-primary"
              placeholder="Enter new password"
              {...register('password', {
                required: true,
                // minLength: 8,
                // pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
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
            <label className="dark:text-renaissance-dark-black lg:block font-medium lg:text-sm text-renaissance-black">
              Confirm Password
            </label>

          <input
              name="confirmpassword"
              type="password"
              className="mt-2 text-base placeholder-[#B8C4CE] font-normal rounded w-[340px] h-[56px] px-2 py-2 border border-[#CED6DE] focus:outline-0 focus:border-primary"
              placeholder="Confirm new password"
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
          </div>

        <Button
          disabled={isSubmitting}
          className="!bg-primary-green w-full lg:w-[274px] h-[48px] !border-0 !px-8 my-10 !text-primary-white"
          size="xlarge"
        >
          {isSubmitting ? 'Updating Profile' : 'Update Profile'}
        </Button>
      </form>
    </section>
  );
};

export default Settings;
