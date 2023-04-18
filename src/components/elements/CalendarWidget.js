import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./calendar.css";
import { upcoming } from "../../utils/dummyData";
import { formatDate } from "../../helpers/functions";


const CalendarWidget = ({ dateValue, setDateValue }) => {
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
    <div className="text-center -ml-2 flex justify-center md:justify-normal font-medium ">
      <Calendar
        onChange={setDateValue}
        value={dateValue}
        formatShortWeekday={(locale, date) =>
          ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
        }
        next2Label={null}
        prev2Label={null}
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
    </div>
  );
}

export default CalendarWidget