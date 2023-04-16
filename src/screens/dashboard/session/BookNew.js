import React from 'react';
import { H3, P } from '../../../components/Headings';
import { BackArrow } from '../../../assets/icons';
import { Link } from 'react-router-dom';
import { routes } from '../../../router/routes';
import CalendarWidget from '../../../components/elements/CalendarWidget';
import manStandDumbell from '../../../assets/images/man_stand_dumbell.png';
import { useState } from 'react';
import { Button } from '@deposits/ui-kit-react';
import DurationTimePicker from '../../../components/sections/explore/DurationTimePicker';
import { plans } from '../../../utils/dummyData';
import { useCookies } from 'react-cookie';
import {
  useSessions,
  useTotalCoins,
} from '../../../helpers/hooks/queries/useSessions';

export const formatTime = (time) => {
  if (time === 0) {
    return `12:00 AM`;
  } else if (time > 12) {
    return `${time - 12}:00 PM`;
  } else {
    return `${time}:00 AM`;
  }
};

const PlanCard = ({
  id,
  name,
  desc,
  startTime,
  endTime,
  fiat_price,
  coin_price,
  selected,
  setSelected,
}) => {
  return (
    <div
      role="button"
      className={` border border-gray-4 rounded-2xl h-36w-80 lg:h-[174px] lg:w-[446px] p-4 lg:p-6 gap-x-3 space-y-4 lg:space-y-8 text-renaissance-black dark:text-renaissance-dark-black  
      ${selected === id && ' bg-primary-green/30'}`}
      onClick={() => setSelected(id)}
    >
      <section className={`flex`}>
        <div className="flex-1 space-y-1 lg:space-y-4">
          <h5 className="text-base lg:text-lg font-semibold"> {name} </h5>
          <p className="text-primary-gray font-normal text-sm lg:text-sm">
            {' '}
            {desc}{' '}
          </p>
        </div>
        <div>
          <p className="flex items-baseline text-primary-gray">
            <span className="self-start pr-0.5 text-xs lg:text-base">£</span>
            <span className="font-bold font-droid text-[32px] lg:text-5xl text-renaissance-black dark:text-renaissance-dark-black">
              {' '}
              {fiat_price}{' '}
            </span>
            /hour
          </p>
        </div>
      </section>

      <section className="flex items-baseline justify-between ">
        <div className="flex-1 flex items-baseline  gap-x-1 lg:gap-x-8">
          <div className="bg-badge-gray font-normal py-0.5 px-2 text-xxs rounded-xlg text-neutral-700">
            Available Time
          </div>
          <p className="font-semibold text-xxs lg:text-xs">
            {formatTime(startTime) + ' - ' + formatTime(endTime)}
          </p>
        </div>

        <div className="font-semibold text-xs">{coin_price} coins/hr</div>
      </section>
    </div>
  );
};

const BookNew = () => {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data } = useSessions();
  const { data: dataCoins } = useTotalCoins();

  console.log(dataCoins);
  return (
    <div className=" text-renaissance-black dark:text-renaissance-dark-black !px-6 lg:!px-6 xl:!px-12  pt-6 pb-24 transition w-full ">
      <section className="">
        <H3> Book a session </H3>
        <P className="  ">
          After booking a session, you will be able to see extend your session
          by 30 mins at half your booking fee
        </P>
      </section>

      <section className="py-10 ">
        <Link to={`/${routes.dashboard_home}/${routes.session}`}>
          <img src={BackArrow} alt="back arrow" />
        </Link>
      </section>

      <section className="flex lg:flex-row flex-col items-center lg:items-start gap-y-20 lg:gap-y-0 justify-between">
        <div className=" lg:pr-[5%] xl:pr-[20%] text-center lg:text-left">
          <div>
            <H3>Select Date and Time</H3>
            <P className="pt-2 pb-10">
              In your local time GMT +8{' '}
              <span className="text-renaissance-blue pl-2">Update </span>
            </P>
            <CalendarWidget
              setDateValue={setSelectedDate}
              dateValue={selectedDate}
            />
          </div>

          <div className="mt-20 text-left hidden lg:block">
            {!selectedPlan ? (
              <div className="flex items-center gap-5 w-full">
                <p> Choose preferred session to see available time </p>
                <img src={manStandDumbell} alt="manStandDumbell" />
              </div>
            ) : (
              <DurationTimePicker
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                selectedDuration={selectedDuration}
                setSelectedDuration={setSelectedDuration}
              />
            )}
          </div>
        </div>

        <div className="w-full max-w-2xl">
          <H3>Pay-As-You-Go</H3>
          <P className="pt-2 pb-10">
            In your local time GMT +8{' '}
            <span className="text-renaissance-blue pl-2">Update </span>
          </P>

          <div className="space-y-6">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                {...plan}
                selected={selectedPlan}
                setSelected={setSelectedPlan}
              />
            ))}
          </div>

          <div className="mt-20 text-left lg:hidden">
            {!selectedPlan ? (
              <div className="flex items-center gap-5 w-full">
                <p> Choose preferred session to see available time </p>
                <img src={manStandDumbell} alt="manStandDumbell" />
              </div>
            ) : (
              <DurationTimePicker
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                selectedDuration={selectedDuration}
                setSelectedDuration={setSelectedDuration}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookNew;
