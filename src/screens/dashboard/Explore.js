import React from 'react';
import { Link } from 'react-router-dom';

import {
  ExploreBanner,
  OverviewCard,
  TimeSlot,
  Activity,
  UpcomingSession,
} from '../../components/sections';

import { Heading2 } from '../../components/Headings';

import { DumbellOrange, CoinGreen, MoneyBlue } from '../../assets/icons';

import { timeSlots, activities } from '../../utils/dummyData';

const Explore = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
      <section className="col-span-1 lg:col-span-2 p-5 lg:p-10">
        <ExploreBanner />

        <article className="my-12">
          <Heading2 className="text-renaissance-black text-sm lg:text-lg font-bold">
            Overview
          </Heading2>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-x-1 lg:gap-x-4">
            <OverviewCard
              title="total sessions"
              figures="10"
              icon={DumbellOrange}
              textColor="text-orange-1"
              bgColor="bg-orange-light"
            />
            <OverviewCard
              title="Coin balance"
              figures="3,500"
              icon={CoinGreen}
              textColor="text-green-2"
              bgColor="bg-green-light"
            />
            <OverviewCard
              title="total coins spent"
              figures="10, 030"
              icon={MoneyBlue}
              textColor="text-primary-blue"
              bgColor="bg-blue-light"
            />
          </div>
        </article>

        <article>
          <Heading2 className="text-renaissance-black text-sm lg:text-lg font-bold">
            Pay as you go
          </Heading2>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-4">
            {timeSlots.map((slot) => (
              <TimeSlot key={slot.id} slot={slot} />
            ))}
          </div>
        </article>

        <article className="mt-12">
          <div className="flex items-center justify-between">
            <Heading2 className="text-renaissance-black text-sm lg:text-lg font-bold">
              Recent Activities
            </Heading2>

            <Link to="/dashboard/notifications">
              <span className="capitalize cursor-pointer text-renaissance-black text-sm font-semibold underline">
                see all
              </span>
            </Link>
          </div>

          <div>
            {activities.map((item) => (
              <Activity key={item.id} item={item} />
            ))}
          </div>
        </article>
      </section>

      <section className="col-span-1  bg-white py-10 !px-4 lg:!px-0 xl:!px-8 text-base font-semibold text-renaissance-black">
        <UpcomingSession />
      </section>
    </div>
  );
};

export default Explore;
