import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { CaretRightWhite } from '../../../assets/icons';

import { routes } from '../../../router/routes';

const ScheduledSession = ({ session }) => {
  return (
    <div className="bg-primary-green flex justify-between items-center text-white p-6  rounded-lg">
      <div className="flex-1 flex items-center">
        <div className="mr-8">
          <span className="text-base block font-medium">
            {moment(session.date).format('ddd')}
          </span>
          <span className="text-4xl font-semibold">
            {moment(session.date).format('D')}
          </span>
        </div>

        {/* details */}
        <div>
          <span className="font-semibold text-sm">{session?.slot_name}</span>
          <span className="text-[10px] font-normal block mt-1 mb-4">
            {session?.time}
          </span>
          <span className="w-fit py-1.5 !px-4 rounded block text-center bg-white text-[10px] font-semibold text-primary-green">
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