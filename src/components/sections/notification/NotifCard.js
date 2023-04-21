import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { supabase } from '../../../utils/supabaseConfig';

import { ReactComponent as CalendarIcon } from '../../../assets/icons/calendar.svg';
import { ReactComponent as GoldCoins } from '../../../assets/icons/coins-gold.svg';

import moment from 'moment';

const NotifCard = ({ item, lastItem }) => {
  const navigate = useNavigate();

  const notifLink =
    item?.type === 'session'
      ? '/dashboard/session/upcoming'
      : '/dashboard/wallet';

  const editNotification = async () => {
    const { data, error } = await supabase
      .from('notifications')
      .update({ isRead: true })
      .eq('id', item?.id)
      .select();

    if (data) {
      navigate(notifLink);
    }
    console.log(data, error);
  };

  return (
    <div
      onClick={editNotification}
      className={`${
        item?.id === lastItem?.id ? 'border-none' : 'border-b border-gray-4'
      } py-6`}
    >
      <div className="cursor-pointer flex items-start justify-between">
        <div className="flex-1 flex items-start">
          <div className="mr-2.5">
            {item?.type === 'session' ? (
              <CalendarIcon className="stroke-renaissance-black dark:stroke-primary-white" />
            ) : (
              <GoldCoins />
            )}
          </div>

          <div>
            <h3 className="font-semibold text-sm text-renaissance-black dark:text-primary-white mb-1">
              {item?.message}
            </h3>
            <span className="text-xs text-gray-2 font-medium">
              {moment(item?.created_at).format('D MMMM, YYYY, h:mm:ss A')}
            </span>
          </div>
        </div>

        {item?.isRead ? (
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
