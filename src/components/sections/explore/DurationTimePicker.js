import React from 'react'
import { plans } from '../../../utils/dummyData'
import { Button } from '@deposits/ui-kit-react'
import { formatTime } from '../../../screens/dashboard/session/BookNew'



export const slotsCreator = (start, end) => {
  return Array(end - start).fill(0).map((item, index) => ({
    id: index,
    formattedTime: formatTime(start + index),
    start: start + index
  }))
}

export const intervalCreator = (start, end, startConstant) => {
  return Array(end - ((end > start) ? start : startConstant)).fill(0).map((item, index) => index + 1)
}

const TimeCard = ({ content, id, selected, setSelected, ...props }) => {
  return (
    <button
      className={`w-full lg:w-[84px] h-9 flex items-center justify-center border border-gray-4  font-semibold text-xs rounded-lg
    ${selected === id && 'bg-primary-green/30 !text-primary-green !border-primary-green dark:!border-primary-dark-green dark:!text-primary-dark-green '}`}
      {...props}
    >
      {content}
    </button>
  )
}


const DurationTimePicker = ({
  type,
  selectedPlan,
  setSelectedPlan,
  setSelectedDate,
  selectedDate,
  selectedTime,
  setSelectedTime,
  selectedDuration,
  setSelectedDuration,
  submitHandler,
  coinBalance }) => {

  const { startTime, endTime, coin_price } = plans[selectedPlan - 1]

  return (
    <div className='flex flex-col gap-6 lg:gap-12 '>
      <div className=''>
        <p className='mb-4 font-medium text-base text-center lg:text-left'> {selectedDate.toDateString()}  <span className='font-semibold'> - Choose Time </span></p>
        <div className=' grid grid-cols-1 lg:grid-cols-4 gap-y-2 lg:gap-y-6 w-full '>
          {slotsCreator(startTime, endTime).map(time => (
            <TimeCard key={time.id} id={time.start} content={time.formattedTime} selected={selectedTime} setSelected={setSelectedTime} onClick={() => setSelectedTime(time.start)} />
          ))}
        </div>
      </div>

      {type !== 'reschedule' && <div className=''>
        <p className='mb-4 font-medium text-base text-center lg:text-left'> Choose Hours </p>
        <div className='lg: grid  grid-cols-1 lg:grid-cols-4 gap-y-2 lg:gap-y-6 w-full'>
          {intervalCreator(selectedTime || startTime, endTime, startTime).map(duration => (
            <TimeCard key={duration} id={duration} content={`${duration} Hours`} selected={selectedDuration} setSelected={setSelectedDuration} onClick={() => setSelectedDuration(duration)} />
          ))}
        </div>
      </div>}

      <div className='flex justify-between items-baseline'>
        <p className='flex items-baseline text-primary-gray'>
          <span>Total Coin Amount</span>
          <span className='self-start px-1 text-xs lg:text-base'>£</span>
          <span className='font-bold font-droid text-[32px] lg:text-5xl text-renaissance-black dark:text-renaissance-dark-black'> {0} </span>
        </p>
        <p className='font-semibold'>{type === 'reschedule' ? '0' : selectedDuration * coin_price} coins</p>
      </div>

      <div>
        <Button
          disabled={!selectedDuration || !selectedPlan || selectedTime === null}
          className={`!w-full !border-0 px-0 lg:!px-8 !text-primary-white 
                    ${(!selectedDuration || !selectedPlan || selectedTime === null) ? '!bg-gray-4' : ' !bg-primary-green '}`}
          size="xlarge"
          onClick={submitHandler}
        >
          {type === 'reschedule' ? 'Reschedule' : 'Book'} Session for {selectedDate.toDateString()}
        </Button>
        {type !== 'reschedule' && <p className='font-semibold mt-6'> Coin Balance: {coinBalance} Coins </p>}
      </div>
    </div>
  )
}

export default DurationTimePicker