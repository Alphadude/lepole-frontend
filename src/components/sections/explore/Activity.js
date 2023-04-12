import React from 'react';
import {
  CalendarIcon,
  NotificationIcon,
  GoldCoins,
} from '../../../assets/icons';

const Activity = ({ item }) => {
  return (
    <div className="mt-6 p-2.5 border border-gray-4 rounded-tl-lg flex items-center">
      <img
        src={
          item.type === 'purchase'
            ? GoldCoins
            : item.type === 'reminder'
            ? CalendarIcon
            : NotificationIcon
        }
        alt="activity icon"
      />
      <span className="ml-3 text-xs lg:text-sm text-renaissance-black dark:text-primary-white">
        {item.text}
      </span>
    </div>
  );
};

export default Activity;
