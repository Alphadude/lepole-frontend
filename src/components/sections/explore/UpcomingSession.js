import React, { useState, useEffect } from 'react';

import Calendar from 'react-calendar';
import './calendar.css';

import { upcoming } from '../../../utils/dummyData';
import moment from 'moment';

import ScheduledSession from './ScheduledSession';

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
          moment(item.date).format('DD-MM-YYYY') ===
          moment(dates).format('DD-MM-YYYY'),
      ),
    );
  }, [dates]);

  return (
    <>
      <article>
        <div className="mb-3">Upcoming Session</div>

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
                  moment(item).format('DD-MM-YYYY') ===
                  moment(date).format('DD-MM-YYYY'),
              )
            ) {
              return 'highlights';
            }
          }}
        />
      </article>

      <article className="text-renaissance-black">
        <div className="mt-10 mb-3 capitalize">scheduled Session</div>

        {upcoming.length === 0 || scheduled?.length === 0 ? (
          <p className="text-sm font-normal">
            You do not have any session for today, Go to sessions page to book a
            session
          </p>
        ) : (
          <div>
            <p className="text-sm font-normal mb-4">
              View your schedule sessions for the day
            </p>

            <div className="grid grid-cols-1 gap-4">
              {scheduled?.map((item) => (
                <ScheduledSession key={item.id} session={item} />
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
};

export default UpcomingSession;
