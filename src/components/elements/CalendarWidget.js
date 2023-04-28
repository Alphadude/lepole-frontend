import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./calendar.css";
import { upcoming } from "../../utils/dummyData";
import { formatDate } from "../../helpers/functions";


const CalendarWidget = ({ dateValue, setDateValue }) => {

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
        minDate={new Date()}
      />
    </div>
  );
}

export default CalendarWidget