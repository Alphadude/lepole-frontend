import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { H2, H3, H5 } from './Headings';
import { ReactComponent as CloseSvg } from '../assets/icons/close.svg'
import { ReactComponent as CloseWhiteSvg } from '../assets/icons/close-white.svg'
import DurationTimePicker, { intervalCreator } from './sections/explore/DurationTimePicker';
import CalendarWidget from './elements/CalendarWidget';
import { P } from './Headings';
import { initialDataSessions } from '../screens/dashboard/session/Upcoming';
import { plans } from '../utils/dummyData';
import { supabase } from '../utils/supabaseConfig';
import { toast } from 'react-toastify';
import { Banner } from '@deposits/ui-kit-react';



export const RescheduleModal = ({ toggleModal, selectedSession = initialDataSessions, headerSubtitle, buttonText, label, placeholder }) => {
  const currentPlanId = plans.findIndex(item => (item.name === selectedSession.data.type)) + 1

  // const [selectedPlan, setSelectedPlan] = useState((currentPlanId > 0) ? currentPlanId : 3);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const time = selectedTime || new Date(selectedSession?.data?.startTime).getHours()
  const duration = selectedDuration || Number(selectedSession.data.duration[0])

  let maxHour
  if (currentPlanId) {
    const { startTime, endTime, coin_price } = plans[currentPlanId - 1]
    maxHour = intervalCreator(selectedTime || startTime, endTime, startTime)?.length
  }



  const reschedule = async (data) => {
    const start = [selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), time]
    const end = [selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), time + selectedDuration]

    const response = await supabase
      .from("session")
      .select("*")
      .eq("id", selectedSession?.data?.id)
      .update({
        date: selectedDate.toISOString().slice(0, 10),
        duration: `${maxHour < selectedDuration ? maxHour : selectedDuration} hrs`,
        startTime: new Date(...start).toISOString(),
        endTime: new Date(...end).toISOString(),
      });

    if (response) {
      toast.success('Reschedule Successful')
    }
  };


  return (
    <div onClick={(e) => e.stopPropagation()} className=' px-2 max- lg:w-[948px] text-sm font-normal pt-5 bg-transparent '>
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
                {(maxHour < Number(selectedSession?.data?.duration[0])) && < Banner colorScheme='warning' description='You will forfeit some of your time if you continue' />}
              </div>
              <DurationTimePicker
                type={'reschedule'}
                selectedPlan={(currentPlanId > 0) ? currentPlanId : 3}
                // setSelectedPlan={setSelectedPlan}
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
                selectedTime={time}
                setSelectedTime={setSelectedTime}
                selectedDuration={duration}
                setSelectedDuration={setSelectedDuration}
                submitHandler={reschedule}
              />
            </div>
          </section>


        </main>

      </div>
    </div >
  )
}

