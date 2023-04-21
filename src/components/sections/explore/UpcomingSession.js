import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Calendar from 'react-calendar';
import './exploreCalendar.css';

import ScheduledSession from './ScheduledSession';

import { formatDate } from '../../../helpers/functions';

const UpcomingSession = ({ scheduled }) => {
  const arrDates =
    scheduled?.length !== 0
      ? scheduled?.map((item) => new Date(item?.date))
      : [];

  //sets the calendar to the first day of upcoming dates if available
  const [dates, setDate] = useState(
    arrDates?.length === 0 ? new Date() : arrDates?.[0],
  );

  // create the scheduled array for more session details
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    if (scheduled?.length !== 0) {
      setUpcoming(
        scheduled?.filter(
          (item) =>
            formatDate(item?.date, 'DD-MM-YYYY') ===
            formatDate(dates, 'DD-MM-YYYY'),
        ),
      );
    }
  }, [dates, scheduled]);

  return (
    <>
      <article className="upcoming-calendar">
        <div className="mb-3 text-renaissance-black dark:text-primary-white">
          Upcoming Session
        </div>

        <Calendar
          onChange={setDate}
          value={dates}
          next2Label={null}
          prev2Label={null}
          formatShortWeekday={(locale, date) =>
            ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
          }
          tileClassName={({ date, view }) => {
            if (
              arrDates?.find(
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

      <article className="flex-1 text-renaissance-black">
        <div className="mt-10 mb-3 capitalize text-renaissance-black dark:text-primary-white">
          scheduled Session
        </div>

        {scheduled?.length === 0 || upcoming?.length === 0 ? (
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
              {upcoming?.slice(0, 2)?.map((item) => (
                <ScheduledSession key={item.id} session={item} />
              ))}
            </div>

            {upcoming?.length >= 3 && (
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
