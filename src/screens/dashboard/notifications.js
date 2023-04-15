import React from 'react';
import { notifications } from '../../utils/dummyData';

import { NotifCard } from '../../components/sections';

const Notifications = () => {
  const lastItem = notifications[notifications?.length - 1];
  return (
    <div className="p-6 lg:px-6 xl:px-12 lg:py-10">
      <h2 className="text-xl font-bold text-renaissance-black dark:text-primary-white">
        Notifications
      </h2>

      <p className="mt-2 text-base font-normal text-renaissance-black dark:text-primary-white">
        See all notifications
      </p>

      <section className="mt-6 border border-gray-4 !px-4 lg:!px-6 rounded-t-2xl">
        {notifications?.length === 0 ? (
          <div className="py-6 text-xl font-bold text-renaissance-black dark:text-primary-white">
            You do not have any notification yet.
          </div>
        ) : (
          notifications.map((item) => (
            <NotifCard key={item.id} item={item} lastItem={lastItem} />
          ))
        )}
      </section>
    </div>
  );
};

export default Notifications;
