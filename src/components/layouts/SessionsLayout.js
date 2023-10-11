import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../router/routes';
import { H2 } from '../Headings';

const tabs = [
  {
    id: 1,
    name: 'Active Sessions',
    link: `/${routes.dashboard_home}/${routes.session}`,
    // link: `${routes.active}`
  },
  {
    id: 2,
    name: 'Upcoming Sessions',
    link: `${routes.upcoming}`,
  },
  {
    id: 3,
    name: 'History',
    link: `${routes.history}`,
  },
];

const SessionsLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col text-renaissance-black dark:text-renaissance-dark-black font-normal text-base flex-1 p-6 md:p-8 lg:px-6 xl:px-12">
      <section className="mb-10">
        <H2 className="lg:hidden "> Sessions </H2>
        <p>Keep track of all your session in one page</p>
      </section>

      <section className="flex justify-between lg:justify-start border-b border-gray-4 dark:border-gray-4/20 gap-3 md:gap-6 ">
        {tabs.map((tab) => {
          const link =
            tab.link.trim()[0] === '/'
              ? tab.link
              : `/${routes.dashboard_home}/${routes.session}/${tab.link}`;
          return (
            <Link
              key={link}
              to={link}
              className={`text-sm md:text-base ${location.pathname === link &&
                'border-b-2 border-primary-green text-primary-green dark:border-primary-dark-green dark:text-primary-dark-green font-semibold '
                }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </section>
      <section className=" flex-1 h-full">
        {children}
        {/* <Outlet /> */}
      </section>
    </div>
  );
};

export default SessionsLayout;
