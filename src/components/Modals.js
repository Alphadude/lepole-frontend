import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { H2, H3, H5 } from './Headings';
import { ReactComponent as CloseSvg } from '../assets/icons/close.svg'
import DurationTimePicker from './sections/explore/DurationTimePicker';
import CalendarWidget from './elements/CalendarWidget';
import { P } from './Headings';

export const RescheduleModal = ({ toggleModal, planId, headerSubtitle, buttonText, label, placeholder }) => {

  const [selectedPlan, setSelectedPlan] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { register, handleSubmit, formState: { errors }, } = useForm();


  const reschedule = async (data) => {

  };

  return (
    <div className=' max- w-[948px] text-sm font-normal py-5 pb-40 bg-transparent '>
      <div className='bg-white '>
        <header className='flex px-8 py-5 justify-between pb-'>
          <H2>Reschedule</H2>
          <button>
            <CloseSvg />
          </button>
        </header>
        <main className='bg-neutral py-9 px-8'>
          <section className='mb-'>
            <H5 className='font-montserrat'>Reschedule a session</H5>
            <P className=''>You can reschedule your session within 30 minutes of booking and this will cost you half your booking price</P>
          </section>



          <section className='flex gap-20 mt-12'>
            <div className=' max-w-xs '>
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

            <div className="mt-20 text-left flex-1">
              <DurationTimePicker
                selectedPlan={planId}
                setSelectedPlan={setSelectedPlan}
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                selectedDuration={selectedDuration}
                setSelectedDuration={setSelectedDuration}
              />
            </div>
          </section>


        </main>

      </div>
    </div>
  )
}

