import React, { useState } from 'react';
import { OptionArrow } from '../../../assets/icons';

const MoreOptions = ({ setCancelValues, setModalValues }) => {
  return (
    <div
      className={`z-50 absolute bottom-0 right-0  bg-white border border-dark-6 w-fit shadow-xl`}
    >
      <button
        className="border-b border-primary-gray-2 py-2 pl-3 pr-8 block text-renaissance-gray-2"
        onClick={setModalValues}
      >
        Reschedule
      </button>

      <button className="py-2 pl-3 pr-8  text-red-1" onClick={setCancelValues}>
        Cancel
      </button>
    </div>
  );
};

const ManageCancellation = ({ setCancelValues, setModalValues }) => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <div className="flex gap-4 relative">
      <button
        className="flex items-center gap-x-2"
        onClick={() => setShowDrop(true)}
      >
        <span className="underline">Options</span>
        <img src={OptionArrow} alt="more options" />
      </button>

      {showDrop && (
        <MoreOptions
          setCancelValues={setCancelValues}
          setModalValues={setModalValues}
        />
      )}

      {/* overlay */}
      <div
        className={
          showDrop
            ? 'fixed block h-full w-full bg-transparent top-0 left-0 z-30'
            : 'hidden'
        }
        onClick={() => setShowDrop(false)}
      ></div>
    </div>
  );
};

export default ManageCancellation;
