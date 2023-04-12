import React from 'react';
// import { GoldCoins } from '../../../assets/icons';

import { ReactComponent as CalendarIcon } from '../../../assets/icons/calendar.svg';
import { ReactComponent as NotificationIcon } from '../../../assets/icons/notification.svg';
import { ReactComponent as GoldCoins } from '../../../assets/icons/coins-gold.svg';

const Activity = ({ item }) => {
  return (
    <div className="mt-6 p-2.5 border border-gray-4 rounded-tl-lg flex items-center">
      {item.type === 'purchase' ? (
        <GoldCoins />
      ) : item.type === 'reminder' ? (
        <CalendarIcon className="stroke-renaissance-black dark:stroke-primary-white" />
      ) : (
        <NotificationIcon className=" stroke-renaissance-black dark:stroke-primary-white" />
      )}

      <span className="ml-3 text-xs lg:text-sm text-renaissance-black dark:text-primary-white">
        {item.text}
      </span>
    </div>
  );
};

export default Activity;
