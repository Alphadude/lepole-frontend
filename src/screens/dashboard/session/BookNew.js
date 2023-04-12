import React from 'react'
import { H3, P } from '../../../components/Headings'
import { BackArrow } from '../../../assets/icons'
import { Link } from 'react-router-dom'
import { routes } from '../../../router/routes'
import CalendarWidget from '../../../components/elements/CalendarWidget'
import manStandDumbell from '../../../assets/images/man_stand_dumbell.png'
import { useState } from 'react'
import { Button } from '@deposits/ui-kit-react'

const plans = [
  {
    id: 1,
    name: 'Off PeaK',
    desc: 'The best value if you are someone that loves to have less people at the gym',
    startTime: 12,
    endTime: 4,
    fiat_price: 5,
    coin_price: 2
  },
  {
    id: 2,
    name: 'Mid Peak',
    desc: 'The best value if you are someone that loves to have less people at the gym',
    startTime: 4,
    endTime: 6,
    fiat_price: 10,
    coin_price: 2
  },
  {
    id: 3,
    name: 'PeaK',
    desc: 'The best value if you are someone that loves to have less people at the gym',
    startTime: 6,
    endTime: 9,
    fiat_price: 15,
    coin_price: 2
  },
]

const timeSlots = [
  {
    id: 1,
    time: '12:00 AM'
  },
  {
    id: 2,
    time: '1:00 AM'
  },
  {
    id: 3,
    time: '2:00 AM'
  },
  {
    id: 4,
    time: '3:00 AM'
  },
]

const durationSlots = [
  {
    id: 1,
    duration: 1,
  },
  {
    id: 2,
    duration: 2,
  },
  {
    id: 3,
    duration: 3,
  },
  {
    id: 4,
    duration: 4,
  },
]

const PlanCard = ({ id, name, desc, startTime, endTime, fiat_price, coin_price, selected, setSelected }) => {
  return (
    <div
      role='button'
      className={` border border-gray-4 rounded-2xl h-36 w-80 md:h-[174px] md:w-[446px] p-4 md:p-6 gap-x-3 space-y-4 md:space-y-8 text-renaissance-black dark:text-renaissance-dark-black  
      ${selected === id && ' bg-primary-green/30'}`}
      onClick={() => setSelected(id)}
    >
      <section className={`flex`} >
        <div className='flex-1 space-y-1 md:space-y-4'>
          <h5 className='text-sm md:text-lg font-semibold'> {name} </h5>
          <p className='text-primary-gray font-normal text-xs md:text-sm'> {desc} </p>
        </div>
        <div>
          <p className='flex items-baseline text-primary-gray'>
            <span className='self-start pr-0.5 text-xs md:text-base'>£</span>
            <span className='font-bold font-droid text-[32px] md:text-5xl text-renaissance-black dark:text-renaissance-dark-black'> {fiat_price} </span>
            /hour
          </p>
        </div>
      </section>

      <section className='flex items-baseline justify-between '>
        <div className='flex-1 flex items-baseline  gap-x-1 md:gap-x-8'>
          <div className='bg-badge-gray font-normal py-0.5 px-2 text-xxs rounded-xlg text-neutral-700'>Available Time</div>
          <p className='font-semibold text-xxs md:text-xs'>
            {startTime}:00 AM - {endTime}:00 PM
          </p>
        </div>

        <div className='font-semibold text-xs'>
          {coin_price} coins/hr
        </div>
      </section>


    </div>
  )
}

const TimeCard = ({ content, id, selected, setSelected, ...props }) => {
  return (
    <button
      onClick={() => setSelected(id)}
      className={`w-[84px] h-9 flex items-center justify-center border border-gray-4  font-semibold text-xs rounded-lg
    ${selected === id && 'bg-primary-green/30 !text-primary-green !border-primary-green dark:!border-primary-dark-green dark:!text-primary-dark-green '}`}
      {...props}
    >
      {content}
    </button>
  )
}

const BookNew = () => {
  const [selectedPlan, setSelectedPlan] = useState(0)
  const [selectedTime, setSelectedTime] = useState(0)
  const [selectedDuration, setSelectedDuration] = useState(0)
  const [selectedDate, setSelectedDate] = useState(new Date())


  return (
    <div className=' text-renaissance-black dark:text-renaissance-dark-black pl-[4%] pr-[8%] pt-6 pb-24 transition  '>
      <section className=''>
        <H3> Book a session </H3>
        <P className='  '>
          After booking a session, you will be able to see extend your session by 30 mins at half your booking fee
        </P>
      </section>

      <section className='py-10 '>
        <Link to={`/${routes.dashboard_home}/${routes.session}`}>
          <img src={BackArrow} alt="back arrow" />
        </Link>
      </section>

      <section className='flex lg:flex-row flex-col items-center lg:items-start gap-y-10 lg:gap-y-0 justify-between'>
        <div className='max-w-min text-center lg:text-left'>
          <div>
            <H3>Select Date and Time</H3>
            <P className='pt-2 pb-10'>In your local time GMT +8 <span className='text-renaissance-blue pl-2'>Update </span></P>
            <CalendarWidget setDateValue={setSelectedDate} dateValue={selectedDate} />
          </div>

          <div className='mt-10 text-left '>
            {!selectedPlan ? (
              <div className='flex items-center gap-5'>
                <p> Choose preferred session to see available time </p>
                <img src={manStandDumbell} alt="manStandDumbell" />
              </div>
            ) : (
              <div className='flex flex-col gap-6 lg:gap-12 '>
                <div className=''>
                  <p className='mb-4 font-medium text-base text-center lg:text-left'> {selectedDate.toDateString()}  <span className='font-semibold'> - Choose Time </span></p>
                  <div className='grid grid-cols-3 lg:grid-cols-4 gap-4 w-max '>
                    {timeSlots.map(time => (
                      <TimeCard key={time.id} id={time.id} content={time.time} selected={selectedTime} setSelected={setSelectedTime} />
                    ))}
                  </div>
                </div>

                <div className=''>
                  <p className='mb-4 font-medium text-base text-center lg:text-left'> Choose Hours </p>
                  <div className='grid grid-cols-3 lg:grid-cols-4 gap-4 w-max '>
                    {durationSlots.map(duration => (
                      <TimeCard key={duration.id} id={duration.id} content={`${duration.duration} Hours`} selected={selectedDuration} setSelected={setSelectedDuration} />
                    ))}
                  </div>
                </div>

                <div className='flex justify-between items-baseline'>
                  <p className='flex items-baseline text-primary-gray'>
                    <span>Total Coin Amount</span>
                    <span className='self-start px-1 text-xs lg:text-base'>£</span>
                    <span className='font-bold font-droid text-[32px] lg:text-5xl text-renaissance-black dark:text-renaissance-dark-black'> {0} </span>
                  </p>
                  <p className='font-semibold'>{0} coins</p>
                </div>

                <div>
                  <Button
                    disabled={!selectedDuration || !selectedPlan || !selectedTime}
                    className={`!w-full !border-0 !px-8 !text-primary-white 
                    ${(!selectedDuration || !selectedPlan || !selectedTime) ? '!bg-gray-4' : ' !bg-primary-green '}`}
                    size="xlarge"
                  >
                    Book Session for {selectedDate.toDateString()}
                  </Button>
                  <p className='font-semibold mt-6'> Coin Balance: {48} Coins </p>
                </div>
              </div>
            )}
          </div>
        </div>


        <div className=''>
          <H3>Pay-As-You-Go</H3>
          <P className='pt-2 pb-10'>In your local time GMT +8 <span className='text-renaissance-blue pl-2'>Update </span></P>

          <div className='space-y-6'>
            {plans.map(plan => (
              <PlanCard key={plan.id} {...plan} selected={selectedPlan} setSelected={setSelectedPlan} />
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default BookNew