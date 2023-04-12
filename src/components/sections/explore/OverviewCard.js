import React from 'react';

const OverviewCard = ({ title, icon, figures, bgColor, textColor }) => {
  return (
    <div className="md:h-20 bg-white shadow-6xl flex items-start rounded-lg  !px-2 lg:!px-4 py-4">
      <div
        className={`${bgColor} h-4 w-4 rounded-full flex items-center justify-center`}
      >
        <img src={icon} alt={`${title} icon`} />
      </div>

      <div className="ml-2 flex-1">
        <div className="capitalize text-primary-gray text-xs font-medium">
          {title}
        </div>

        <div className={`${textColor} font-bold text-lg md:text-xl`}>
          {figures}
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
