import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./calendar.css";
import { upcoming } from "../../utils/dummyData";
import { formatDate } from "../../helpers/functions";

// const CalendarWrapper = styled.div`
//   background-color: #ffffff;
//   border-radius: 20px;
//   padding: ${(props) =>
//     props.small ? "2.375rem 1rem 1.25rem" : "2.375rem 10.4% 2.25rem"};
//   box-shadow: 10px 10px 73px rgba(32, 32, 35, 0.03);
//   height: 100%;

//   //override react-calendar default styles
//   & .react-calendar {
//     border: none;
//     width: 100%;
//     font-family: inherit;
//   }
//   & .react-calendar__navigation {
//     margin-bottom: 2rem;
//     height: auto;
//   }
//   & .react-calendar__navigation__label {
//     color: ${({ theme }) => theme.colors.purpleDark};
//     font-weight: 700;
//     font-size: 0.75rem;
//   }
//   & .react-calendar__navigation__arrow {
//     color: ${({ theme }) => theme.colors.purple};
//   }
//   & .react-calendar__viewContainer {
//     font-size: 0.75rem;
//     font-weight: 600;
//   }
//   & .react-calendar__month-view__weekdays {
//     color: ${({ theme }) => theme.colors.purple};
//   }
//   &
//     .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__month-view__days__day--neighboringMonth {
//     color: rgba(126, 126, 143, 0.3);
//   }
//   & .react-calendar__tile.react-calendar__month-view__days__day {
//     color: #535362;
//   }
//   &
//     .react-calendar__tile.react-calendar__tile--now.react-calendar__tile--active.react-calendar__tile--range.react-calendar__tile--rangeStart.react-calendar__tile--rangeEnd.react-calendar__tile--rangeBothEnds.react-calendar__month-view__days__day {
//     background-color: ${({ theme }) => theme.colors.purple};
//     color: #ffffff;
//   }
//   &
//     .react-calendar__tile.react-calendar__tile--now.react-calendar__month-view__days__day {
//     background-color: #f4f6fa;
//   }
//   &
//     .react-calendar__tile.react-calendar__tile--active.react-calendar__tile--range.react-calendar__tile--rangeStart.react-calendar__tile--rangeEnd.react-calendar__tile--rangeBothEnds.react-calendar__month-view__days__day {
//     background-color: ${({ theme }) => theme.colors.purple};
//   }
// `;


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