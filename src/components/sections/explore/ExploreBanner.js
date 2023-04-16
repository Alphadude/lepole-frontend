import React from 'react';
import { Heading2 } from '../../Headings';
import { gymCharacters } from '../../../assets/images';

const ExploreBanner = ({ name }) => {
  return (
    <div className="h-fit md:h-36 lg:h-fit  xl:h-48  flex lg:items-center xl:items-stretch  justify-between w-full bg-[#E2EFE9] dark:bg-[#1060604D] px-2 lg:!px-6 !py-4 rounded-2xl">
      <div className="flex flex-col  justify-between">
        <Heading2 className="text-primary-green dark:text-primary-white text-sm lg:text-base !font-bold">
          Welcome, {name}
        </Heading2>

        <p className=" text-xs lg:text-base font-medium text-renaissance-black dark:text-[#E5E5E5] xl:w-2/3 my-2 xl:my-0">
          We have tailored our sessions to be flexible and affordable.
        </p>

        <p className="text-xs lg:text-base font-medium text-renaissance-black dark:text-[#E5E5E5] ">
          Book a session to begin your journey with us
        </p>
      </div>

      <div className="">
        <img
          className="md:h-28 lg:h-fit xl:h-40"
          src={gymCharacters}
          alt="gym characters lifting weights"
        />
      </div>
    </div>
  );
};

export default ExploreBanner;
