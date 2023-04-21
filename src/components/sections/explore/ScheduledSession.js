import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { CaretRightWhite } from '../../../assets/icons';

import { routes } from '../../../router/routes';

const ScheduledSession = ({ session }) => {
  return (
    <div className="bg-primary-green flex justify-between items-center text-white p-4  xl:p-6  rounded-lg">
      <div className="flex-1 flex items-center">
        <div className="mr-8 lg:mr-4 xl:mr-8">
          <span className="text-base block font-medium">
            {moment(session?.date).format('ddd')}
          </span>
          <span className="text-4xl font-semibold">
            {moment(session?.date).format('D')}
          </span>
        </div>

        {/* details */}
        <div>
          <span className="font-semibold text-sm">{session?.type}</span>
          <div className="flex gap-x-1 items-center  font-normal">
            <span className="block text-[10px]">
              {moment(session?.startTime).format('HH:mm a')}
            </span>
            <span>-</span>
            <span className="block text-[10px]">
              {moment(session?.endTime).format('HH:mm a')}
            </span>
          </div>

          <span className="w-fit py-1 !px-6 rounded block text-center bg-white text-[10px] font-semibold text-primary-green">
            {session?.duration}
          </span>
        </div>
      </div>

      <Link to={`/dashboard/${routes.session}`}>
        <div className="cursor-pointer">
          <img src={CaretRightWhite} alt="go to session" />
        </div>
      </Link>
    </div>
  );
};

export default ScheduledSession;
