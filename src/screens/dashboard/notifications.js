import React from 'react';

import { NotifCard } from '../../components/sections';

import { useGetNotifications } from '../../helpers/hooks/queries/useNotifications';

const Notifications = () => {
  const { data: notifications } = useGetNotifications();

  const lastItem = notifications?.data?.[notifications?.data?.length - 1];

  return (
    <div className="p-6 lg:px-6 xl:px-12 lg:py-10">
      <h2 className="text-xl font-bold text-renaissance-black dark:text-primary-white">
        Notifications
      </h2>

      <p className="mt-2 text-base font-normal text-renaissance-black dark:text-primary-white">
        See all notifications
      </p>

      <section className="mt-6 border border-gray-4 !px-4 md:!pl-7 md:!pr-8 rounded-t-2xl w-full lg:w-[680px] xl:w-[700px]">
        {notifications?.data?.length === 0 ? (
          <div className="py-6 text-xl font-bold text-renaissance-black dark:text-primary-white">
            You do not have any notification yet.
          </div>
        ) : (
          notifications?.data?.map((item) => (
            <NotifCard key={item.id} item={item} lastItem={lastItem} />
          ))
        )}
      </section>
    </div>
  );
};

export default Notifications;
