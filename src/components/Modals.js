import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { H2, H3, H4, H5 } from './Headings';
import { ReactComponent as CloseSvg } from '../assets/icons/close.svg'
import { ReactComponent as CloseWhiteSvg } from '../assets/icons/close-white.svg'
import DurationTimePicker, { intervalCreator } from './sections/explore/DurationTimePicker';
import CalendarWidget from './elements/CalendarWidget';
import { P } from './Headings';
import { initialDataSessions } from '../screens/dashboard/session/Upcoming';
import { plans } from '../utils/dummyData';
import { supabase } from '../utils/supabaseConfig';
import { toast } from 'react-toastify';
import { Banner, Button, Radio } from '@deposits/ui-kit-react';
import { useProfile, useTotalCoins } from '../helpers/hooks/queries/useSessions';
import { useQueryClient } from 'react-query';
import { deductCoins } from '../helpers/functions/deductCoins';



export const RescheduleModal = ({ toggleModal, selectedSession = initialDataSessions, headerSubtitle, buttonText, label, placeholder }) => {
  const currentPlanId = plans.findIndex(item => (item.name === selectedSession.data.type)) + 1


  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const queryClient = useQueryClient()


  const time = selectedTime || new Date(selectedSession?.data?.startTime).getHours()
  const duration = Number(selectedSession.data.duration[0])


  const { startTime, endTime, coin_price } = plans[currentPlanId - 1]
  const maxDuration = intervalCreator(selectedTime || startTime, endTime, startTime)?.length
  const isDurationReduced = maxDuration < duration
  const acceptedDuration = isDurationReduced ? maxDuration : duration


  const rescheduleSession = async () => {
    const start = [selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), time]
    const end = [selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), time + acceptedDuration]

    const submit = {
      date: selectedDate.toISOString().slice(0, 10),
      duration: `${acceptedDuration} hours`,
      reschedule_amount: (acceptedDuration * coin_price) / 2,
      startTime: new Date(...start).toISOString(),
      endTime: new Date(...end).toISOString(),
    }

    const res = await deductCoins(submit.reschedule_amount)
    if (!res) return

    queryClient.invalidateQueries('profile')
    const { data, error } = await supabase
      .from("session")
      .update(submit)
      .eq("id", selectedSession?.data?.id)

    console.log(data, error);

    if (!error) {
      queryClient.invalidateQueries('upcoming-sessions')
      toast.success('Reschedule Successful')
      toggleModal()
    }
  };


  return (
    <div onClick={(e) => e.stopPropagation()} className=' px-2 lg:w-[948px] text-sm font-normal pt-5 bg-transparent '>
      <div className='bg-white dark:bg-table-border-gray  '>
        <header className='flex px-2 lg:!px-8 py-5 justify-between '>
          <H2>Reschedule</H2>
          <button className='inline dark:hidden' onClick={toggleModal}>
            <CloseSvg />
          </button>
          <button className='hidden dark:inline' onClick={toggleModal}>
            <CloseWhiteSvg />
          </button>
        </header>
        <main className='bg-neutral dark:bg-table-border-gray py-9 px-2 lg:!px-8'>
          <section className=''>
            <H5 className='font-montserrat dark:text-renaissance-dark-black '>Reschedule a session</H5>
            <P className=''>You can reschedule your session within 30 minutes of booking and this will cost you half your booking price</P>
          </section>



          <section className='flex flex-col lg:flex-row lg:gap-20 mt-12'>
            <div className=' lg:max-w-xs '>
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

            <div className=" text-left flex-1 ">

              <div className='mt-20 mb-10 ' >
                {(isDurationReduced) && < Banner colorScheme='warning' description='You will forfeit some of your time if you continue' />}
              </div>
              <DurationTimePicker
                type={'reschedule'}
                selectedPlan={(currentPlanId > 0) ? currentPlanId : 3}
                // setSelectedPlan={setSelectedPlan}
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
                selectedTime={time}
                setSelectedTime={setSelectedTime}
                selectedDuration={acceptedDuration}
                // setSelectedDuration={setSelectedDuration}
                submitHandler={rescheduleSession}
              />
            </div>
          </section>


        </main>

      </div>
    </div >
  )
}


const paymentOptions = [
  {
    id: 1,
    title: 'Credit or Debit Card',
    desc: 'Use a credit card or debit card to initiate payment and get access to your booking session',
    recommended: false,
    next: () => { toast.error('Option not available at the moment') }
  },
  {
    id: 2,
    title: 'Wallet Balance',
    desc: 'Use a credit card or debit card to initiate payment and get access to your booking session',
    recommended: true,
    next: () => { console.log('Trigger coin deduction') }
  },
]


export const SelectPaymentOption = ({ toggleModal, fromWalletNext, loading }) => {
  const [selected, setSelected] = useState(2)
  paymentOptions[1].next = fromWalletNext

  return (
    <section onClick={(e) => e.stopPropagation()} className=' sm:w-[522px] bg-white dark:bg-table-border-gray pb-10 pt-5 mb-10 '>
      <div className=' mb-11 px-6'>
        <H4>Choose payment method</H4>
        <P className='mt-1'>Choose a payment method to complete booking</P>
      </div>

      <div className='selections'>
        {paymentOptions.map(option => (
          <div
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={`flex px-3 py-3 items-center gap-x-3 border-l-4 cursor-pointer ${selected === option.id ? 'border-primary-green dark:border-primary-dark-green bg-[#00808022] ' : 'border-transparent'} `}
          >
            <div className=' w-6'>
              <input readOnly style={{ boxShadow: selected === option.id ? '0 0 0 5px #006666' : '0 0 0 1px #8F9499' }} type='radio' id='selectedOption' checked={selected === option.id} className={`accent-primary-green bg-primary-green appearance-none rounded-[50%] border-white box-content  ${selected === option.id ? 'border-[5px]' : 'border-[7px]'} `} />
            </div>

            <div className='space-y-2'>
              <div className='flex justify-between pr-10'>
                <p className='font-semibold  dark:text-renaissance-dark-black '>{option.title}</p>
                {option.recommended && <p className='font-medium text-gray-2  dark:text-gray-4 italic'>Recommended</p>}
              </div>
              <p className='text-gray-1  dark:text-gray-2 text-sm font-normal '>
                {option.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className='px-10 mt-9'>
        <Button
          className={`!w-full !border-0 px-0 lg:!px-8 !text-primary-white !bg-primary-green `}
          size="xlarge"
          onClick={paymentOptions[selected - 1]?.next}
        >
          {loading ? 'Processing...'
            : paymentOptions[0].id === selected ? 'Continue to Payment' : 'Pay Now'}
        </Button>
      </div>


    </section>
  )
}