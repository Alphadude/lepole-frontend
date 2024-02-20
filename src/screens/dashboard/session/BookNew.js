import React from 'react';
import { H3, P } from '../../../components/Headings';
import { BackArrow } from '../../../assets/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../../router/routes';
import CalendarWidget from '../../../components/elements/CalendarWidget';
import manStandDumbell from '../../../assets/images/man_stand_dumbell.png';
import { useState } from 'react';
import DurationTimePicker from '../../../components/sections/explore/DurationTimePicker';
import { plans } from '../../../utils/dummyData';
import { useCookies } from 'react-cookie';
import { useProfile } from '../../../helpers/hooks/queries/useSessions';
import { supabase } from '../../../utils/supabaseConfig';
import { toast } from 'react-toastify';
import ModalContainer from '../../../components/layouts/ModalContainer';
import { SelectPaymentOption } from '../../../components/Modals';
import moment from 'moment';
import StripeCheckoutComp, { defaultSessionData } from './StripeCheckout';
import { coinsBookSession } from '../../../assets/images';
import {
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError,
} from '@supabase/supabase-js';

export const formatTime = (time) => {
  if (time === 0 || time === 24) {
    return `12:00 AM`;
  } else if (time === 12) {
    return `12:00 PM`;
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
  setSelectedTime,
  setSelectedDuration,
}) => {
  return (
    <div
      role="button"
      className={`relative border border-gray-4 rounded-2xl min-h-36 w-full lg:h-[174px] lg:w-[446px] p-4 lg:p-6 gap-x-3 space-y-4 lg:space-y-6 overflow-hidden text-renaissance-black dark:text-renaissance-dark-black  
      ${selected === id && ' bg-primary-green/30'}`}
      onClick={() => {
        setSelectedTime(null);
        setSelectedDuration(0);
        setSelected(id);
      }}
    >
      <section className={`flex `}>
        <div className="flex-1 space-y-1 lg:space-y-4">
          <h5 className="text-base lg:text-lg font-semibold"> {name} </h5>
          <p className="text-primary-gray font-normal text-sm lg:text-sm text-ellipsis w-2/3 md:w-3/4">
            {' '}
            {desc}{' '}
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

        {/* <div className="font-semibold text-xs">{coin_price} coins/hr</div> */}
      </section>

      <section className="absolute md:-top-16 md:-right-8 -top-20 -right-10 w-40 h-40 rounded-full bg-[#F7F7F7] flex font-montserrat  ">
        <div className="flex items-center mt-auto ml-9 mb-5 md:mb-9 text-xl font-medium text-center text-renaissance-black ">
          <div>
            <p>
              {' '}
              <span className=" text-gray-1">£</span> {fiat_price}
            </p>
            <hr className="border-[#8F9499]" />
            <p className="text-2xl flex items-baseline">
              {' '}
              <img src={coinsBookSession} alt="" /> <span>{coin_price}</span>{' '}
            </p>
          </div>
          <p className="text-[#8F9499] !font-normal pl-2">/hr</p>
        </div>
      </section>
    </div>
  );
};

const BookNew = () => {
  let { state } = useLocation();

  const [modalOpen, setModalOpen] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionData, setSessionData] = useState(defaultSessionData);
  const [selectedPlan, setSelectedPlan] = useState(state?.planId || 0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const navigate = useNavigate();
  const [cookies] = useCookies(['user']);
  const { data: dataProfile } = useProfile();

  const dataCoins = dataProfile?.data?.user?.user_metadata?.wallet;

  const toggleSelectPaymentModal = () => {
    setModalOpen((prev) => (prev ? '' : 'select-payment'));
  };

  const toggleStripePaymentModal = () => {
    setModalOpen((prev) => (prev !== 'stripe-payment' ? 'stripe-payment' : ''));
  };

  const closeStripeModal = () => {
    setModalOpen(false);
  };

  const createSession = async (type) => {
    if (!cookies?.user?.id) {
      toast('Please relogin to perform this action');
      return;
    }

    setLoading(true);
    const { id, firstname, lastname } = cookies?.user;
    const plan = plans[selectedPlan - 1];
    const { name, coin_price, fiat_price } = plan;
    const start = [
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime,
    ];
    const end = [
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime + selectedDuration,
    ];

    let endTime;

    if (selectedTime + selectedDuration === 24) {
      let calculatedTime = new Date(...end);

      calculatedTime.setHours(11);
      calculatedTime.setMinutes(45);
      calculatedTime.setSeconds(0);
      calculatedTime.setMilliseconds(0);

      endTime = moment(calculatedTime).format('YYYY-MM-DDTHH:mm:ss');
    } else {
      // endTime = new Date(...end).toISOString();
      endTime = moment(new Date(...end)).format('YYYY-MM-DDTHH:mm:ss');
    }

    const submit = {
      user_id: id,
      username: `${firstname} ${lastname}`,
      payment: type === 'stripe-payment' ? 'stripe' : 'coin balance',
      amount:
        (type === 'stripe-payment' ? fiat_price * 100 : coin_price) *
        selectedDuration,
      type: name,
      date: moment(selectedDate).format('YYYY-MM-DD'),
      duration: `${selectedDuration} hours`,
      // startTime: new Date(...start).toISOString(),
      startTime: moment(new Date(...start)).format('YYYY-MM-DDTHH:mm:ss'),
      endTime: endTime,
    };

    console.log(
      {
        selectedDate,
        selectedTime,
        selectedDuration,
        end,

        start,
        submit,
      },
      selectedTime + selectedDuration === 24,
    );

    if (type === 'stripe-payment') {
      setSessionData({ ...submit, payment_kind: 'book-session' });
      setLoading(false);
      toggleStripePaymentModal();
      return;
    }

    const { data, error } = await supabase.functions.invoke('book-session', {
      body: JSON.stringify({
        session: { ...submit, email: cookies?.user?.email },
      }),
    });

    setLoading(false);

    if (!error) {
      setSelectedPlan(0);
      toast.success('Created session Successfully');
      navigate('/dashboard/session/upcoming');
      toggleSelectPaymentModal('');
    } else {
      if (error instanceof FunctionsHttpError) {
        const errorMessage = await error.context.json();

        toast.error(errorMessage?.message);

        toggleSelectPaymentModal('');
      } else if (error instanceof FunctionsRelayError) {
        toast.error(error.message);

        toggleSelectPaymentModal('');
      } else if (error instanceof FunctionsFetchError) {
        toast.error(error.message);

        toggleSelectPaymentModal('');
      }
    }
  };

  return (
    <>
      {modalOpen === 'select-payment' && (
        <ModalContainer
          modalOpen={modalOpen}
          toggleModal={toggleSelectPaymentModal}
        >
          <SelectPaymentOption
            toggleModal={toggleSelectPaymentModal}
            next={createSession}
            loading={loading}
          />
        </ModalContainer>
      )}
      {modalOpen === 'stripe-payment' && (
        <ModalContainer
          modalOpen={modalOpen}
          toggleModal={toggleStripePaymentModal}
        >
          <StripeCheckoutComp
            toggleModal={closeStripeModal}
            next={createSession}
            loading={loading}
            sessionData={sessionData}
            type={'book-session'}
          />
        </ModalContainer>
      )}

      <div className=" text-renaissance-black dark:text-renaissance-dark-black !px-6 lg:!pl-6 xl:!pl-12  pt-6 pb-24 transition w-full ">
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

        <section className="flex lg:flex-row flex-col items-center lg:items-start gap-y-20 lg:gap-y-0 justify-between ">
          <div className=" max-w-sm flex- text-center lg:text-left">
            <div>
              <H3 className={`mb-10`}>Select Date and Time</H3>

              <CalendarWidget
                setDateValue={setSelectedDate}
                dateValue={selectedDate}
              />
            </div>

            <div className="mt-20 text-left hidden lg:block ">
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
                  submitHandler={toggleSelectPaymentModal}
                  coinBalance={dataCoins}
                />
              )}
            </div>
          </div>

          <div className="flex-1 ">
            <div className="  flex-1 max-w-max mx-auto ">
              <H3 className={`mb-10`}>Pay-As-You-Go</H3>

              <div className="space-y-6">
                {plans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    {...plan}
                    selected={selectedPlan}
                    setSelected={setSelectedPlan}
                    setSelectedTime={setSelectedTime}
                    setSelectedDuration={setSelectedDuration}
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
                    submitHandler={toggleSelectPaymentModal}
                    coinBalance={dataCoins}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BookNew;
