import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as CalendarIcon } from '../../../assets/icons/calendar.svg';
import { ReactComponent as NotificationIcon } from '../../../assets/icons/notification.svg';
import { ReactComponent as GoldCoins } from '../../../assets/icons/coins-gold.svg';

const Activity = ({ item }) => {
  const notifLink =
    item?.type === 'wallet'
      ? '/dashboard/wallet'
      : item.type === 'reminder'
      ? '/dashboard/session/upcoming'
      : '/dashboard/notifications';

  return (
    <div className="mt-6 p-2.5 border border-gray-4 rounded-tl-lg flex items-center">
      <div className="flex items-center">
        {item.type === 'wallet' ? (
          <GoldCoins />
        ) : item.type === 'reminder' ? (
          <CalendarIcon className="stroke-renaissance-black dark:stroke-primary-white" />
        ) : (
          <NotificationIcon className=" stroke-renaissance-black dark:stroke-primary-white" />
        )}
        <span className="flex-1 ml-3 text-xs lg:text-sm text-renaissance-black dark:text-primary-white">
          {item.text}
        </span>
      </div>

      {item.seen ? (
        ''
      ) : (
        <Link to={notifLink}>
          <div className="ml-4">
            <button className="text-sm  font-semibold text-primary-green bg-transparent capitalize !shadow-none !focus:outline-0">
              view
            </button>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Activity;
