import { Link } from 'react-router-dom';
import { formatTime } from '../../../screens/dashboard/session/BookNew';

const TimeSlot = ({ slot }) => {
  return (
    <div
      className={`${slot.id === 3
        ? 'bg-orange-1/10 dark:bg-[#DCB2601A] '
        : slot.id === 2
          ? 'bg-[#F5F9F7] dark:bg-[#151515]'
          : 'bg-[#C7C9CC1A]'
        } p-4 flex md:block justify-between items-end rounded-lg`}
    >
      <div>
        <h3 className="capitalize font-semibold text-renaissance-black dark:text-primary-white text-sm lg:text-base">
          {slot.name}
        </h3>

        <span className="font-semibold block text-xs mt-1 mb-4 text-primary-gray ">
          {`${formatTime(slot?.startTime)} -  ${formatTime(slot?.endTime)}`}
        </span>

        <span className="block md:mb-4 text-xs text-renaissance-black dark:text-primary-white font-medium">
          {slot?.coin_price} coins/hr
        </span>
      </div>

      <div>
        <Link to="/dashboard/session/new" state={{ planId: slot.id }} >
          <button className="font-montserrat py-2 !px-8 bg-transparent text-sm border border-primary-green text-primary-green capitalize rounded-full font-medium">
            book now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TimeSlot;
