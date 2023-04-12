import { Button } from '@deposits/ui-kit-react';

const TimeSlot = ({ slot }) => {
  return (
    <div
      className={`${
        slot.id === 3
          ? 'bg-orange-1/10'
          : slot.id === 2
          ? 'bg-[#F5F9F7]'
          : 'bg-gray-4/20'
      } p-4 flex lg:block justify-between items-end rounded-lg`}
    >
      <div>
        <h3 className="capitalize font-semibold text-renaissance-black text-sm lg:text-base">
          {slot.name}
        </h3>

        <span className="font-semibold block text-xs mt-1 mb-4 text-primary-gray ">
          {slot?.time}
        </span>

        <span className="block lg:mb-4 text-xs text-renaissance-black font-medium">
          {slot.fee}
        </span>
      </div>

      <div className="!text-[2px]">
        <Button
          className="font-montserrat !bg-transparent !text-3xl !border !border-primary-green !text-primary-green capitalize  !rounded-3xl !font-medium"
          size="large"
          text="book now"
        />
      </div>
    </div>
  );
};

export default TimeSlot;
