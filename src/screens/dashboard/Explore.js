import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useCookies } from 'react-cookie';

import { supabase } from '../../utils/supabaseConfig';

import {
  ExploreBanner,
  OverviewCard,
  TimeSlot,
  Activity,
  UpcomingSession,
} from '../../components/sections';

import {
  useTotalCoins,
  useSessions,
} from '../../helpers/hooks/queries/useSessions';

import { useGetNotifications } from '../../helpers/hooks/queries/useNotifications';

import { Heading2 } from '../../components/Headings';
import { DumbellOrange, CoinGreen, MoneyBlue } from '../../assets/icons';
import { timeSlots } from '../../utils/dummyData';

const Explore = () => {
  const [cookies] = useCookies(['user']);
  const firstname = cookies?.user?.firstname;
  const userId = cookies?.user?.id;
  const wallet = cookies?.user?.wallet;

  const [scheduled, setScheduled] = useState([]);
  const [loading, setIsLoading] = useState(false);

  const { data: totalSessions } = useSessions();

  const { data: totalCoinsSpent } = useTotalCoins();

  const { data: notifications } = useGetNotifications();

  useEffect(() => {
    const getUpcomingSessions = async () => {
      setIsLoading(true);
      try {
        const date = new Date(Date.now());
        const dateString = date.toISOString().substring(0, 10);

        const response = await supabase
          .from('session')
          .select('*')
          .eq('user_id', userId)
          .gt('date', dateString);

        if (response?.data !== 0 || response?.data?.length !== 0) {
          setScheduled(response?.data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        return error;
      }
    };

    getUpcomingSessions();
  }, [userId]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
      <section className="col-span-1 lg:col-span-2 p-6 lg:px-6 xl:px-12 lg:py-10">
        <ExploreBanner name={firstname} />

        <article className="my-12">
          <Heading2 className="text-renaissance-black dark:text-primary-white text-sm lg:text-base">
            Overview
          </Heading2>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
            <OverviewCard
              title="total sessions"
              figures={totalSessions?.data?.length}
              icon={DumbellOrange}
              textColor="text-orange-1"
              bgColor="bg-orange-light dark:bg-orange-1/20"
            />
            <OverviewCard
              title="Coin balance"
              figures={wallet}
              icon={CoinGreen}
              textColor="text-green-2"
              bgColor="bg-green-light dark:bg-primary-green/20"
            />
            <OverviewCard
              title="total coins spent"
              figures={
                totalCoinsSpent?.data !== null ? totalCoinsSpent?.data : 0
              }
              icon={MoneyBlue}
              textColor="text-primary-blue"
              bgColor="bg-blue-light dark:bg-primary-blue/20"
            />
          </div>
        </article>

        <article>
          <Heading2 className="text-renaissance-black dark:text-primary-white text-sm lg:text-base">
            Pay as you go
          </Heading2>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-4">
            {timeSlots.map((slot) => (
              <TimeSlot key={slot.id} slot={slot} />
            ))}
          </div>
        </article>

        <article className="mt-12">
          <div className="flex items-center justify-between">
            <Heading2 className="text-renaissance-black dark:text-primary-white text-sm lg:text-base font-semibold">
              Recent Activities
            </Heading2>

            {notifications?.data?.length !== 0 && (
              <Link to="/dashboard/notifications">
                <span className="capitalize cursor-pointer text-renaissance-black dark:text-primary-white text-sm font-semibold underline">
                  see all
                </span>
              </Link>
            )}
          </div>

          {notifications?.data?.length === 0 ? (
            <div className="mt-4 dark:text-primary-white text-renaissance-black teext-base">
              There are no recent activities yet.
            </div>
          ) : (
            <div>
              {notifications?.data?.slice(0, 3).map((item) => (
                <Activity key={item.id} item={item} />
              ))}
            </div>
          )}
        </article>
      </section>

      <section className="py-10 !px-6 lg:!px-2 xl:!px-8  col-span-1 sm:flex justify-between sm:gap-x-4 md:gap-x-2 lg:gap-x-0 lg:block bg-white dark:bg-dark-white text-base font-semibold text-renaissance-black">
        <UpcomingSession
          // upcoming={scheduled}
          loading={loading}
          scheduled={scheduled}
        />
      </section>
    </div>
  );
};

export default Explore;
