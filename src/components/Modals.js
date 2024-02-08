import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { H2, H3, H4, H5 } from './Headings';
import { ReactComponent as CloseSvg } from '../assets/icons/close.svg';
import { ReactComponent as CloseWhiteSvg } from '../assets/icons/close-white.svg';

import RescheduleTimePicker, {
  intervalCreator,
} from './sections/explore/RescheduleTimePicker';

import CalendarWidget from './elements/CalendarWidget';
import { P } from './Headings';
import { initialDataSessions } from '../screens/dashboard/session/Upcoming';
import { plans } from '../utils/dummyData';
import { supabase } from '../utils/supabaseConfig';
import { toast } from 'react-toastify';
import { Banner, Button, Radio } from '@deposits/ui-kit-react';
import { SelectDropdown } from './elements';
import { cancelReason } from '../utils/dummyData';
import {
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError,
} from '@supabase/supabase-js';

import { useCookies } from 'react-cookie';

import ModalContainer from './layouts/ModalContainer';

import StripeCheckoutComp, {
  defaultSessionData,
} from '../screens/dashboard/session/StripeCheckout';

import { useQueryClient } from 'react-query';
import moment from 'moment';

import { WarningOrange, GoldCoins, RedCheck } from '../assets/icons';
import { isRefundEligible } from '../helpers/functions';

export const RescheduleModal = ({
  toggleModal,
  selectedSession = initialDataSessions,
  headerSubtitle,
  buttonText,
  label,
  placeholder,
}) => {
  const [cookies] = useCookies(['user']);

  const { id, firstname, lastname } = cookies?.user;
  const [modalOpen, setModalOpen] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rescheduleData, setRescheduleData] = useState(defaultSessionData);

  const currentPlanId =
    plans.findIndex((item) => item.name === selectedSession.data.type) + 1;

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date(selectedSession?.data?.startTime),
  );
  const queryClient = useQueryClient();

  const time =
    selectedTime || new Date(selectedSession?.data?.startTime).getHours();
  const duration = Number(selectedSession.data.duration[0]);

  const { startTime, endTime, coin_price, name } = plans[currentPlanId - 1];

  const maxDuration = intervalCreator(
    selectedTime || startTime,
    endTime,
    startTime,
  )?.length;
  const isDurationReduced = maxDuration < duration;
  const acceptedDuration = isDurationReduced ? maxDuration : duration;

  const toggleStripePaymentModal = () => {
    setModalOpen(!modalOpen);
  };

  const closeStripeModal = () => {
    setModalOpen(false);
  };

  const rescheduleSession = async () => {
    const start = [
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      time,
    ];
    const end = [
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      time + acceptedDuration,
    ];

    const submit = {
      id: selectedSession?.id,
      date: moment(selectedDate).format('YYYY-MM-DD'),
      starttime: new Date(...start).toISOString(),
      endtime: new Date(...end).toISOString(),
    };

    setIsLoading(true);

    if (
      selectedSession?.data?.payment === 'stripe' &&
      !isRefundEligible(selectedSession?.data?.startTime, 8)
    ) {
      setRescheduleData({
        ...submit,
        payment_kind: 'session-reschedule',
        user_id: id,
        username: `${firstname} ${lastname}`,
        payment: 'stripe',
        amount: (Number(selectedSession?.data?.amount) * 100) / 2,
        duration: selectedSession?.data?.duration,
        type: name,
      });
      setIsLoading(false);
      toggleStripePaymentModal();
      return;
    }

    const { data, error } = await supabase.functions.invoke(
      'reschedule-session',
      {
        body: JSON.stringify(submit),
      },
    );

    if (!error) {
      setIsLoading(false);
      queryClient.invalidateQueries('upcoming-sessions');
      toast.success('Reschedule Successful');
      toggleModal();
    } else {
      if (error instanceof FunctionsHttpError) {
        const errorMessage = await error.context.json();
        toast.error(errorMessage?.message);
        setIsLoading(false);
      } else if (error instanceof FunctionsRelayError) {
        toast.error(error.message);
        setIsLoading(false);
      } else if (error instanceof FunctionsFetchError) {
        toast.error(error.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" px-2 lg:w-[948px] text-sm font-normal pt-5 bg-transparent "
    >
      <div className="bg-white dark:bg-table-border-gray  ">
        <header className="flex px-2 lg:!px-8 py-5 justify-between ">
          <H2>Reschedule</H2>
          <button className="inline dark:hidden" onClick={toggleModal}>
            <CloseSvg />
          </button>
          <button className="hidden dark:inline" onClick={toggleModal}>
            <CloseWhiteSvg />
          </button>
        </header>
        <main className="bg-neutral dark:bg-table-border-gray py-9 px-2 lg:!px-8">
          <section className="">
            <H5 className="font-montserrat dark:text-renaissance-dark-black ">
              Reschedule a session
            </H5>
            <P className="">
              View our cancellation and refund policy
              <a
                className="ml-1 underline text-blue-green font-bold"
                rel="noopener noreferrer"
                target="_blank"
                href="https://lepoleltd.com/pages/terms-conditions"
              >
                here
              </a>
            </P>
          </section>

          <section className="flex flex-col lg:flex-row lg:gap-20 mt-12">
            <div className=" lg:max-w-xs ">
              <H3 className={`mb-10`}>Select Date and Time</H3>
              {/* <P className="pt-2 pb-10">
                In your local time GMT +8
                <span className="text-renaissance-blue pl-2"> Update </span>
              </P> */}

              <CalendarWidget
                setDateValue={setSelectedDate}
                dateValue={selectedDate}
              />
            </div>

            <div className=" text-left flex-1 ">
              <div className="mt-20 mb-10 ">
                {isDurationReduced && (
                  <Banner
                    colorScheme="warning"
                    description="You will forfeit some of your time if you continue"
                  />
                )}
              </div>
              <RescheduleTimePicker
                session={selectedSession}
                type={'reschedule'}
                selectedPlan={currentPlanId > 0 ? currentPlanId : 3}
                // setSelectedPlan={setSelectedPlan}
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
                selectedTime={time}
                setSelectedTime={setSelectedTime}
                selectedDuration={acceptedDuration}
                isLoading={isLoading}
                // setSelectedDuration={setSelectedDuration}
                submitHandler={rescheduleSession}
              />
            </div>
          </section>
        </main>
      </div>

      {modalOpen && (
        <ModalContainer
          modalOpen={modalOpen}
          toggleModal={toggleStripePaymentModal}
        >
          <StripeCheckoutComp
            toggleModal={closeStripeModal}
            next={rescheduleSession}
            loading={isLoading}
            sessionData={rescheduleData}
            type={'session-reschedule'}
          />
        </ModalContainer>
      )}
    </div>
  );
};

export const CancelModal = ({ toggleModal, selectedSession }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const closeCancel = (e) => {
    e.preventDefault();
    toggleModal();
  };

  const cancelSession = async (data) => {
    setLoading(true);
    const payload = {
      user_id: selectedSession?.data?.user_id,
      session_id: selectedSession?.id,
      reason: data.reason?.value,
      details: data.details,
    };

    const { data: result, error } = await supabase.functions.invoke(
      'create-cancellation',
      {
        body: JSON.stringify(payload),
      },
    );

    if (!error) {
      queryClient.invalidateQueries('upcoming-sessions');
      setLoading(false);
      setSuccess(true);
    } else {
      if (error instanceof FunctionsHttpError) {
        const errorMessage = await error.context.json();

        toast.error(errorMessage?.message);
        setLoading(false);
        toggleModal();
      } else if (error instanceof FunctionsRelayError) {
        toast.error(error.message);
        setLoading(false);
      } else if (error instanceof FunctionsFetchError) {
        toast.error(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full lg:w-[610px] text-sm font-normal py-5 bg-transparent "
    >
      <div className="bg-white dark:bg-table-border-gray  ">
        <header className="flex px-2 lg:!px-8 py-5 justify-between ">
          <H2>Cancel</H2>
          <button className="inline dark:hidden" onClick={toggleModal}>
            <CloseSvg />
          </button>
          <button className="hidden dark:inline" onClick={toggleModal}>
            <CloseWhiteSvg />
          </button>
        </header>

        {success ? (
          <div className="text-center bg-neutral dark:bg-table-border-gray py-9 px-2 lg:!px-8">
            <div className="h-20 w-20 bg-red_200 mx-auto mb-4 rounded-full flex items-center justify-center">
              <img src={RedCheck} alt="red check mark" />
            </div>

            <H3 className="mb-3 font-medium texl-xl lg:text-2xl font-montserrat text-black dark:text-renaissance-dark-black ">
              Cancel Request Sent
            </H3>
            <div className="text-sm text-gray-2">
              <p>Your request has been sent.</p>
              <p className="lg:w-5/6 mx-auto mt-2">
                Your request will be review soon. Please check your email for
                further updates
              </p>
            </div>

            <div className="text-center mt-8 mb-12">
              <button onClick={toggleModal} className="underline">
                {' '}
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-neutral dark:bg-table-border-gray py-9 px-2 lg:!px-8">
            <section className=" mx-auto">
              <div className="mt-4 mb-8 bg-orange_600 pl-3 pr-1 py-1 rounded">
                <div className="bg-white dark:bg-dark-1 py-3 !px-4 text-neutral_06 dark:text-white/90 text-sm flex items-start gap-x-4">
                  <img src={WarningOrange} alt="information alert" />
                  <span className="flex-1 block text-xs lg:text-sm">
                    {' '}
                    You can cancel your session within 4 hours of booking when
                    you pay with coin and 8 hours when you pay as you go.
                  </span>
                </div>
              </div>

              <H3 className="mb-3 font-montserrat text-black dark:text-renaissance-dark-black ">
                Booking Details
              </H3>

              <div className="bg-white dark:bg-dark-1 text-black dark:text-white border border-renaissance-gray-2 p-4  xl:p-6  rounded-lg">
                <div className="flex item-start lg:items-center">
                  <div className="mr-8 lg:mr-4 xl:mr-8 ">
                    <span className="text-base block font-medium text-center">
                      {moment(selectedSession?.data?.date).format('ddd')}
                    </span>
                    <span className="text-4xl font-semibold">
                      {moment(selectedSession?.data?.date).format('D')}
                    </span>
                  </div>

                  {/* details */}
                  <div className=" flex-1">
                    <div className="flex flex-col lg:flex-row gap-y-1 items-start justify-between ">
                      <div>
                        <span className="font-semibold text-sm">
                          {selectedSession?.data?.type} Session
                        </span>
                        <div className="flex gap-x-1 items-center  font-normal">
                          <span className="block text-[10px]">
                            {moment(selectedSession?.data?.startTime).format(
                              'HH:mm a',
                            )}
                          </span>
                          <span>-</span>
                          <span className="block text-[10px]">
                            {moment(selectedSession?.data?.endTime).format(
                              'HH:mm a',
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="bg-primary-green text-white rounded w-fit !px-4 py-1.5  text-[10px] font-semibold">
                        {selectedSession?.data?.duration}
                      </div>
                    </div>

                    <div className="  mt-4 flex flex-col lg:flex-row lg:items-end gap-y-1 justify-between">
                      <div>
                        <span className="text-[10px]">Amount</span>

                        {selectedSession?.data?.payment === 'coin balance' ? (
                          <div className="flex items-center gap-x-2">
                            <img src={GoldCoins} alt="gold coins" />
                            <span className="font-semibold text-base text-renaissance-black">
                              {selectedSession?.data?.amount} Coins
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <span className="self-start px-1 text-base lg:text-2xl ">
                              £
                            </span>

                            <span className="font-semibold text-base lg:text-2xl  text-renaissance-black">
                              {selectedSession?.data?.amount}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium">
                          Access Code:
                        </span>
                        <span className="font-semibold text-sm">
                          {' '}
                          {selectedSession?.data?.passcode}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(cancelSession)} className="mt-8">
                <div className="mb-6">
                  <label className="block mb-4">Reason for cancellation</label>

                  <Controller
                    control={control}
                    name="reason"
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <SelectDropdown options={cancelReason} {...field} />
                    )}
                  />

                  {errors.reason ? (
                    <div className="text-red-500">Choose a reason</div>
                  ) : null}
                </div>

                <div>
                  <textarea
                    rows="5"
                    className="bg-white dark:bg-dark-1 mt-4 w-full p-2 border border-gray_300 rounded focus:outline-0 focus:border-primary-green"
                    placeholder="More details here"
                    {...register('details', {
                      required: true,
                    })}
                  ></textarea>

                  {errors.details ? (
                    <div className="text-red-500">Please fill this box.</div>
                  ) : null}
                </div>

                <div className="mt-6 flex flex-col md:flex-row gap-2">
                  <Button
                    disabled={loading}
                    className="!bg-red-1 !w-full !border-0 !px-8 !text-primary-white"
                    size="xlarge"
                  >
                    {loading ? 'Confirming..' : 'Confirm Cancellation'}
                  </Button>

                  <Button
                    onClick={closeCancel}
                    className="!bg-white !w-full !border !border-primary-green !px-8 !text-primary-green"
                    size="xlarge"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

const paymentOptions = [
  {
    id: 1,
    title: 'Credit or Debit Card',
    desc: 'Use a credit card or debit card to initiate payment and get access to your booking session',
    recommended: false,
    next: () => {
      console.log('Redirecting to stripe payment');
    },
  },
  {
    id: 2,
    title: 'Wallet Balance',
    desc: 'You get discount payment when you buy wallet bundles and make payment using your wallet balance.',
    recommended: true,
    next: () => {
      console.log('Trigger coin deduction');
    },
  },
];

export const SelectPaymentOption = ({ toggleModal, next, loading }) => {
  const [selected, setSelected] = useState(2);
  paymentOptions[0].next = () => next('stripe-payment');
  paymentOptions[1].next = () => next();

  return (
    <section
      onClick={(e) => e.stopPropagation()}
      className=" sm:w-[522px] bg-white dark:bg-table-border-gray pb-10 pt-5 mb-10 "
    >
      <div className=" mb-11 px-6">
        <H4>Choose payment method</H4>
        <P className="mt-1">Choose a payment method to complete booking</P>
      </div>

      <div className="selections">
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={`flex px-3 py-3 items-center gap-x-3 border-l-4 cursor-pointer ${
              selected === option.id
                ? 'border-primary-green dark:border-primary-dark-green bg-[#00808022] '
                : 'border-transparent'
            } `}
          >
            <div className=" w-6">
              <input
                readOnly
                style={{
                  boxShadow:
                    selected === option.id
                      ? '0 0 0 5px #006666'
                      : '0 0 0 1px #8F9499',
                }}
                type="radio"
                id="selectedOption"
                checked={selected === option.id}
                className={`accent-primary-green bg-primary-green appearance-none rounded-[50%] border-white box-content  ${
                  selected === option.id ? 'border-[5px]' : 'border-[7px]'
                } `}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between pr-10">
                <p className="font-semibold  dark:text-renaissance-dark-black ">
                  {option.title}
                </p>
                {option.recommended && (
                  <p className="font-medium text-gray-2  dark:text-gray-4 italic">
                    Recommended
                  </p>
                )}
              </div>
              <p className="text-gray-1  dark:text-gray-2 text-sm font-normal ">
                {option.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-10 mt-9">
        <Button
          className={`!w-full !border-0 px-0 lg:!px-8 !text-primary-white !bg-primary-green `}
          size="xlarge"
          disabled={loading}
          onClick={paymentOptions[selected - 1]?.next}
        >
          {loading
            ? 'Processing...'
            : paymentOptions[0].id === selected
            ? 'Continue to Payment'
            : 'Pay Now'}
        </Button>
      </div>
    </section>
  );
};
