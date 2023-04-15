import React, { useState } from 'react';
import { H1, H2, H5 } from '../../../components/Headings';
import { TextField, Button } from '@deposits/ui-kit-react';

const Settings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <section className="p-6 lg:px-6 xl:px-12 lg:py-10">
      <H2 className="mb-10 hidden dark:text-renaissance-dark-black lg:block font-bold text-xl lg:text-xl text-renaissance-black">
        Account Settings
      </H2>

      <div className="mb-[40px] flex items-center">
        <div className="w-[80px] h-[80px] text-3xl mr-2 rounded-full bg-avatarBg text-avatarText flex items-center justify-center ">
          DJ
        </div>
        <H2 className="hidden dark:text-renaissance-dark-black lg:block font-bold text-lg lg:text-2xl text-renaissance-black">
          Dolce Joyce
        </H2>
      </div>

      <H1 className="hidden dark:text-renaissance-dark-black lg:block font-bold text-lg lg:text-xl text-renaissance-black">
        Personal Information
      </H1>

      <div className="flex space-x-72 mb-5">
        <div>
          <H5 className="hidden dark:text-renaissance-dark-black lg:block font-medium lg:text-sm text-grey-6">
            First Name
          </H5>
          <H5 className="hidden dark:text-renaissance-dark-black lg:block font-medium lg:text-sm text-renaissance-black">
            Dolce
          </H5>
        </div>

        <div>
          <H5 className="hidden dark:text-renaissance-dark-black lg:block font-medium lg:text-sm text-grey-6">
            Last Name
          </H5>
          <H5 className="hidden dark:text-renaissance-dark-black lg:block font-medium lg:text-sm text-renaissance-black">
            Joyce
          </H5>
        </div>
      </div>

      <div className="flex space-x-48 mb-8">
        <div>
          <H5 className="hidden dark:text-renaissance-dark-black lg:block font-medium lg:text-sm text-grey-6">
            Email Address
          </H5>
          <H5 className="hidden dark:text-renaissance-dark-black lg:block font-medium lg:text-sm text-renaissance-black">
            dolcejoyce@gmail.com
          </H5>
        </div>

        <div>
          <H5 className="hidden dark:text-renaissance-dark-black lg:block font-medium lg:text-sm text-grey-6">
            Phone Number
          </H5>
          <H5 className="hidden dark:text-renaissance-dark-black lg:block font-medium lg:text-sm text-renaissance-black">
            +222 787 345 6789
          </H5>
        </div>
      </div>

      <hr className="h-0.5 mb-8" />

      <H1 className="mb-5 hidden dark:text-renaissance-dark-black lg:block font-bold text-lg lg:text-xl text-renaissance-black">
        Change password
      </H1>

      <form>
        <div className="flex space-x-7 mb-10">
          <TextField
            label="New password"
            placeholder="Enter new password"
            className="w-[340px] h-[56px]"
          />

          <TextField
            label="Confirm password"
            placeholder="Confirm new password"
            className="w-[340px] h-[56px]"
          />
        </div>

        <div className="col-span-1 text-gray-2 text-xs mt-1 mb-20">
          minimum of 8 character long <br /> at least one capital letter <br />{' '}
          at least one symbol <br />
          at least one number
        </div>

        <Button
          disabled={isSubmitting}
          className="!bg-primary-green w-[274px] h-[48px] !border-0 !px-8 !text-primary-white"
          size="xlarge"
        >
          {isSubmitting ? 'Updating Profile' : 'Update Profile'}
        </Button>
      </form>
    </section>
  );
};

export default Settings;
