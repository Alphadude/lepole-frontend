import { Button } from '@deposits/ui-kit-react';
import { Link } from 'react-router-dom';

const TimeSlot = ({ slot }) => {
  return (
    <div
      className={`${
        slot.id === 3
          ? 'bg-orange-1/10 dark:bg-[#DCB2601A] '
          : slot.id === 2
          ? 'bg-[#F5F9F7] dark:bg-[#151515]'
          : 'bg-[#C7C9CC1A]'
      } p-4 flex lg:block justify-between items-end rounded-lg`}
    >
      <div>
        <h3 className="capitalize font-semibold text-renaissance-black dark:text-primary-white text-sm lg:text-base">
          {slot.name}
        </h3>

        <span className="font-semibold block text-xs mt-1 mb-4 text-primary-gray ">
          {slot?.time}
        </span>

        <span className="block lg:mb-4 text-xs text-renaissance-black dark:text-primary-white font-medium">
          {slot.fee}
        </span>
      </div>

      <div>
        <Link to="/dashboard/session/new">
          <Button
            className="font-montserrat !bg-transparent !text-3xl !border !border-primary-green !text-primary-green capitalize  !rounded-3xl !font-medium"
            size="large"
            text="book now"
          />
        </Link>
      </div>
    </div>
  );
};

export default TimeSlot;
