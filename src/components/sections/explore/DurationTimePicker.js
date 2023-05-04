import React from 'react'
import { plans } from '../../../utils/dummyData'
import { Button } from '@deposits/ui-kit-react'
import { formatTime } from '../../../screens/dashboard/session/BookNew'
import { toast } from 'react-toastify'



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

const TimeCard = ({ content, id, selected, setSelected, disabled, ...props }) => {
  return (
    <button
      className={`
        w-full lg:w-[84px] h-9 flex items-center justify-center border border-gray-4  font-semibold text-xs rounded-lg 
        ${disabled && ' border-gray-4/30 text-renaissance-black/30 dark:text-renaissance-dark-black/30 '}
        ${selected === id && ' bg-primary-green/30 !text-primary-green !border-primary-green dark:!border-primary-dark-green dark:!text-primary-dark-green '}
        `}
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

  const { startTime, endTime, coin_price, fiat_price } = plans[selectedPlan - 1]
  const now = new Date()
  return (
    <div className='flex flex-col gap-6 lg:gap-12 '>
      <div className=''>
        <p className='mb-4 font-medium text-base text-center lg:text-left'> {selectedDate.toDateString()}  <span className='font-semibold'> - Choose Time </span></p>
        <div className=' grid grid-cols-1 lg:grid-cols-4 gap-y-2 lg:gap-y-6 w-full '>
          {slotsCreator(startTime, endTime).map(time => {
            const timeString = new Date(selectedDate).toDateString() + ' ' + time.start + ':00:00'
            const timeDateFormat = new Date(timeString)
            const isValidTime = timeDateFormat > now

            return (
              <TimeCard key={time.id} id={time.start} content={time.formattedTime} selected={selectedTime} setSelected={setSelectedTime} disabled={!isValidTime}
                onClick={() => {
                  isValidTime
                    ? setSelectedTime(time.start)
                    : toast.error('Invalid selected time')
                }} />
            )
          })}
        </div>
      </div>

      {type !== 'reschedule' && typeof selectedTime === 'number' && <div className=''>
        <p className='mb-4 font-medium text-base text-center lg:text-left'> Choose Hours </p>
        <div className={`lg: grid  grid-cols-1 lg:grid-cols-4 gap-y-2 lg:gap-y-6 w-full `}>
          {intervalCreator(selectedTime || startTime, endTime, startTime).map(duration => (
            <TimeCard key={duration} id={duration} content={`${duration} Hours`} selected={selectedDuration} setSelected={setSelectedDuration} />
          ))}
        </div>
      </div>}

      <div className='flex justify-between items-baseline'>
        <p className='flex items-baseline text-primary-gray'>
          <span>Total Coin Amount</span>
          <span className='self-start px-1 text-xs lg:text-base'>£</span>
          <span className='font-bold font-droid text-[32px] lg:text-5xl text-renaissance-black dark:text-renaissance-dark-black'> {type === 'reschedule' ? (selectedDuration * fiat_price) / 2 : selectedDuration * fiat_price}  </span>
        </p>
        <p className='font-semibold'>{type === 'reschedule' ? ((selectedDuration * coin_price) / 2) : selectedDuration * coin_price} coins</p>
      </div>

      <div>
        <Button
          disabled={!selectedDuration || !selectedPlan || selectedTime === null}
          className={`!w-full !border-0 px-1 lg:!px-8 !text-primary-white 
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