import React, { useState } from 'react';
import { OptionArrow } from '../../../assets/icons';

const MoreOptions = ({
  setCancelValues,
  setModalValues,
  userCanCancel,
  canReschedule,
}) => {
  return (
    <div
      className={`z-50 absolute bottom-0 right-0  bg-white border border-dark-6 w-fit shadow-xl`}
    >
      {canReschedule && (
        <button
          className="border-b border-primary-gray-2 py-2 pl-3 pr-8 block text-black"
          onClick={setModalValues}
        >
          Reschedule
        </button>
      )}

      {userCanCancel && (
        <button
          className="py-2 pl-3 pr-8  text-red-1"
          onClick={setCancelValues}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

const ManageCancellation = ({
  setCancelValues,
  setModalValues,
  userCanCancel,
  canReschedule,
}) => {
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
          userCanCancel={userCanCancel}
          canReschedule={canReschedule}
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
