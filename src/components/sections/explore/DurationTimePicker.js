import React from 'react'
import { durationSlots, timeSlotsData } from '../../../utils/dummyData'
import { Button } from '@deposits/ui-kit-react'

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


const DurationTimePicker = ({
  selectedPlan,
  setSelectedPlan,
  setSelectedDate,
  selectedDate,
  selectedTime,
  setSelectedTime,
  selectedDuration,
  setSelectedDuration }) => {
  return (
    <div className='flex flex-col gap-6 lg:gap-12 '>
      <div className=''>
        <p className='mb-4 font-medium text-base text-center lg:text-left'> {selectedDate.toDateString()}  <span className='font-semibold'> - Choose Time </span></p>
        <div className='grid grid-cols-3 lg:grid-cols-4 gap-4 w-max '>
          {timeSlotsData.map(time => (
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
  )
}

export default DurationTimePicker