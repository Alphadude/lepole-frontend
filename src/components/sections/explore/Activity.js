import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../utils/supabaseConfig';

import { ReactComponent as CalendarIcon } from '../../../assets/icons/calendar.svg';
import { ReactComponent as GoldCoins } from '../../../assets/icons/coins-gold.svg';

const Activity = ({ item }) => {
  const navigate = useNavigate();

  const notifLink =
    item?.type === 'session'
      ? '/dashboard/session/upcoming'
      : '/dashboard/wallet';

  const editNotification = async () => {
    if (!item?.isRead) {
      const { error } = await supabase
        .from('notifications')
        .update({ isRead: true })
        .eq('id', item?.id)
        .select();

      if (error === null) {
        navigate(notifLink);
      }
    } else {
      navigate(notifLink);
    }
  };

  return (
    <div
      onClick={editNotification}
      className="cursor-pointer mt-6 p-2.5 border border-gray-4 rounded-tl-lg flex items-center"
    >
      <div className="flex items-center">
        {item?.type === 'session' ? (
          <CalendarIcon className="stroke-renaissance-black dark:stroke-primary-white" />
        ) : (
          <GoldCoins />
        )}
        <span className="flex-1 ml-3 text-xs lg:text-sm text-renaissance-black dark:text-primary-white">
          {item?.message}
        </span>
      </div>

      {item?.isRead ? (
        ''
      ) : (
        <div className="ml-4">
          <button className="text-sm  font-semibold text-primary-green bg-transparent capitalize !shadow-none !focus:outline-0">
            view
          </button>
        </div>
      )}
    </div>
  );
};

export default Activity;
