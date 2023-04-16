import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as CalendarIcon } from '../../../assets/icons/calendar.svg';
import { ReactComponent as NotificationIcon } from '../../../assets/icons/notification.svg';
import { ReactComponent as GoldCoins } from '../../../assets/icons/coins-gold.svg';

import moment from 'moment';

const NotifCard = ({ item, lastItem }) => {
  const notifLink =
    item?.type === 'wallet'
      ? '/dashboard/wallet'
      : item.type === 'reminder'
      ? '/dashboard/session/upcoming'
      : '/dashboard/notifications';
  return (
    <div
      className={`${
        item.id === lastItem.id ? 'border-none' : 'border-b border-gray-4'
      } py-6`}
    >
      <div className="flex items-start justify-between lg:w-5/6 xl:w-2/3">
        <div className="flex-1 flex items-start">
          <div className="mr-2.5">
            {item.type === 'wallet' ? (
              <GoldCoins className="h-6" />
            ) : item.type === 'reminder' ? (
              <CalendarIcon className="stroke-renaissance-black dark:stroke-primary-white h-6 w-6" />
            ) : (
              <NotificationIcon className=" stroke-renaissance-black dark:stroke-primary-white h-6 w-6" />
            )}
          </div>

          <div>
            <h3 className="font-semibold text-sm text-renaissance-black dark:text-primary-white mb-1">
              {item.text}
            </h3>
            <span className="text-xs text-gray-2 font-medium">
              {moment(item.timeStamp).format('D MMMM, YYYY, h:mm:ss A')}
            </span>
          </div>
        </div>

        {item.seen ? (
          ''
        ) : (
          <Link to={notifLink}>
            <div>
              <button className="text-sm  font-semibold text-primary-green bg-transparent capitalize !shadow-none !focus:outline-0">
                view
              </button>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NotifCard;
