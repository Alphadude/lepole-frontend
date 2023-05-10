import React from 'react';
import { H3, P } from '../../../components/Headings';
import { BackArrow } from '../../../assets/icons';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../../router/routes';
import CalendarWidget from '../../../components/elements/CalendarWidget';
import manStandDumbell from '../../../assets/images/man_stand_dumbell.png';
import { useState } from 'react';
import { Button } from '@deposits/ui-kit-react';
import DurationTimePicker from '../../../components/sections/explore/DurationTimePicker';
import { plans } from '../../../utils/dummyData';
import { useCookies } from 'react-cookie';
import { useProfile } from '../../../helpers/hooks/queries/useSessions';
import { supabase } from '../../../utils/supabaseConfig';
import { toast } from 'react-toastify';
import ModalContainer from '../../../components/layouts/ModalContainer';
import { RescheduleModal, SelectPaymentOption } from '../../../components/Modals';
import { QueryClient, useQueryClient } from 'react-query';
import { deductCoins } from '../../../helpers/functions/deductCoins';
import moment from 'moment';

export const formatTime = (time) => {
  if (time === 0) {
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
  setSelectedDuration
}) => {
  return (
    <div
      role="button"
      className={` border border-gray-4 rounded-2xl min-h-36 w-full lg:h-[174px] lg:w-[446px] p-4 lg:p-6 gap-x-3 space-y-4 lg:space-y-8 text-renaissance-black dark:text-renaissance-dark-black  
      ${selected === id && ' bg-primary-green/30'}`}
      onClick={() => {
        setSelectedTime(null)
        setSelectedDuration(0)
        setSelected(id)
      }}
    >
      <section className={`flex`}>
        <div className="flex-1 space-y-1 lg:space-y-4">
          <h5 className="text-base lg:text-lg font-semibold"> {name} </h5>
          <p className="text-primary-gray font-normal text-sm lg:text-sm text-ellipsis">
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
  let { state } = useLocation();
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(state?.planId || 0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [cookies] = useCookies(['user']);
  const { data: dataProfile } = useProfile();
  const queryClient = useQueryClient()

  const dataCoins = dataProfile?.data?.user?.user_metadata?.wallet

  const toggleModal = () => {
    setModalOpen(prev => !prev)
  }

  const createSession = async () => {
    setLoading(true)
    const id = cookies.user?.id;
    const plan = plans[selectedPlan - 1]
    const { name, coin_price } = plan
    const start = [selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedTime]
    const end = [selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedTime + selectedDuration]

    const submit = {
      user_id: id,
      payment: "coin balance",
      amount: coin_price * selectedDuration,
      type: name,
      date: moment(selectedDate).format('YYYY-MM-DD'),
      duration: `${selectedDuration} hours`,
      startTime: new Date(...start).toISOString(),
      endTime: new Date(...end).toISOString(),
    }

    const res = await deductCoins(submit.amount)
    if (!res) return

    queryClient.invalidateQueries('profile')
    const { data, error } = await supabase.from("session").insert([submit]);
    console.log({ data, error });
    setLoading(false)

    if (!error) {
      setSelectedPlan(0)
      toast.success('Created session Successfully')
      toggleModal()
    } else {
      toast.error('Failed to save session')
    }
  }




  return (
    <>
      {modalOpen && (
        <ModalContainer modalOpen={modalOpen} toggleModal={toggleModal}>
          <SelectPaymentOption toggleModal={toggleModal} fromWalletNext={createSession} loading={loading} />
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
              <H3 className={`dark:`}>Select Date and Time</H3>
              <P className="pt-2 pb-10">
                In your local time GMT +8{' '}
                <span className="text-renaissance-blue pl-2">Update </span>
              </P>
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
                  submitHandler={toggleModal}
                  coinBalance={dataCoins}
                />
              )}
            </div>
          </div>

          <div className='flex-1 '>
            <div className="  flex-1 max-w-max mx-auto ">
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
                    submitHandler={toggleModal}
                    coinBalance={dataCoins}
                  />
                )}
              </div>
            </div>
          </div>

        </section>

        {/* <section className='mt-40'>
          <StripeCheckoutComp />
        </section> */}
      </div>
    </>
  );
};

export default BookNew;
