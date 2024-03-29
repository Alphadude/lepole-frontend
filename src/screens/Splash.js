import React from 'react';
import { Link } from 'react-router-dom';

import { LePoleLogo } from '../assets/icons';
import { H1, H2, H5 } from '../components/Headings';
import { routes } from '../router/routes';

const splashRoutes = [
  {
    heading: 'Sign up',
    desc: 'This is your first time using this application.',
    route: routes.register,
  },
  {
    heading: 'Log in',
    desc: 'You already have an account with us.',
    route: routes.login,
  },
];

const RouteCard = ({ heading, desc, route }) => {
  return (
    <Link
      role="button"
      to={route}
      className="w-[232px] h-[119px] rounded-2xl border px-[16px] justify-center border-off-black cursor-pointer flex flex-col "
    >
      <p className="mb-[8px] text-off-black text-lg font-bold font-droid">
        {' '}
        {heading}{' '}
      </p>
      <p className="text-sm font-normal text-[#73797F] font-montserrat">
        {' '}
        {desc}{' '}
      </p>
    </Link>
  );
};

const Splash = () => {
  return (
    <div className="min-h-screen flex flex-col items-center  bg-lepole-pattern bg-no-repeat bg-left-bottom bg-black/95 overflow-auto pb-20">
      <section>
        <img src={LePoleLogo} alt="Le Pole logo" />
      </section>

      <section className="flex-1 flex justify-center items-center self-center ">
        <div className="bg-white flex flex-col  w-full max-w-min md:max-w-[600px] h-fit p-6 lg:p-10 text-left rounded-lg ">
          <H2 className="mt-1 md:mt-2 "> Welcome! First things first </H2>
          <H5 className="text-xs ">
            {' '}
            Looking to book a gym session with friends and family?{' '}
          </H5>

          <div className="mt-14 self-center flex flex-col md:flex-row justify-between gap-[24px] ">
            {splashRoutes.map((item) => (
              <RouteCard
                heading={item.heading}
                desc={item.desc}
                route={item.route}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Splash;
