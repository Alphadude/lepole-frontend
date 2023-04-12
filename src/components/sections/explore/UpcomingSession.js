import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Calendar from 'react-calendar';
import './calendar.css';

import ScheduledSession from './ScheduledSession';

import { formatDate } from '../../../helpers/functions';
import { upcoming } from '../../../utils/dummyData';

const UpcomingSession = () => {
  const arrDates = upcoming.map((item) => new Date(item.date));

  const [dates, setDate] = useState(
    arrDates?.length !== 0 ? arrDates[0] : new Date(),
  );

  const [scheduled, setScheduled] = useState([]);

  useEffect(() => {
    setScheduled(
      upcoming?.filter(
        (item) =>
          formatDate(item.date, 'DD-MM-YYYY') ===
          formatDate(dates, 'DD-MM-YYYY'),
      ),
    );
  }, [dates]);

  return (
    <>
      <article>
        <div className="mb-3 text-renaissance-black dark:text-primary-white">
          Upcoming Session
        </div>

        <Calendar
          onChange={setDate}
          value={dates}
          formatShortWeekday={(locale, date) =>
            ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
          }
          tileClassName={({ date, view }) => {
            if (
              arrDates.find(
                (item) =>
                  formatDate(item, 'DD-MM-YYYY') ===
                  formatDate(date, 'DD-MM-YYYY'),
              )
            ) {
              return 'highlights';
            }
          }}
        />
      </article>

      <article className="text-renaissance-black">
        <div className="mt-10 mb-3 capitalize text-renaissance-black dark:text-primary-white">
          scheduled Session
        </div>

        {upcoming.length === 0 || scheduled?.length === 0 ? (
          <p className="text-sm font-normal text-renaissance-black dark:text-primary-white">
            You do not have any session for today, Go to{' '}
            <span className="text-primary-green">sessions </span>
            page to book a session
          </p>
        ) : (
          <div>
            <p className="text-sm font-normal mb-4 text-renaissance-black dark:text-primary-white">
              View your schedule sessions for the day
            </p>

            <div className="grid grid-cols-1 gap-4 mb-3">
              {scheduled?.slice(0, 2)?.map((item) => (
                <ScheduledSession key={item.id} session={item} />
              ))}
            </div>

            {scheduled?.length >= 3 && (
              <Link to="/dashboard/session">
                <span className="capitalize cursor-pointer text-primary-green text-base font-semibold">
                  see more
                </span>
              </Link>
            )}
          </div>
        )}
      </article>
    </>
  );
};

export default UpcomingSession;
