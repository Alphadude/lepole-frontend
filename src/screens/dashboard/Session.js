import React from 'react';
import { Link } from 'react-router-dom';

const tabs = [
  {
    id: 1,
    name: 'Active Sessions',
    link: 'active',
  },
  {
    id: 2,
    name: 'Upcoming Sessions',
    link: 'active',
  },
  {
    id: 3,
    name: 'History',
    link: 'active',
  },
];

const Session = () => {
  return (
    <div className=" text-renaissance-black dark:text-renaissance-dark-black font-normal text-base flex-1 ">
      <section className="">
        <p>Keep track of all your session in one page</p>
      </section>

      <section className="flex border-b border-gray-4 dark:border-x-gray-dark-4">
        {tabs.map((tab) => (
          <Link>{tab.name}</Link>
        ))}
      </section>
    </div>
  );
};

export default Session;
