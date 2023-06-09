import React from 'react';
import { ReactComponent as SingleCoin } from '../../../assets/icons/single-coin.svg';
import { ReactComponent as DoubleCoin } from '../../../assets/icons/double-coin.svg';

import moment from 'moment';

const WalletCard = ({ item, lastItem, onClick }) => {

  return (
    <div role='button' className='bg-bundle-coin-bg px-2 py-4 rounded-lg' onClick={onClick} >
      <div className="grid grid-cols-2 gap-x-10">
        <div className="flex items-center">
          <div className="">
            {item.type === 'less-coins' ? (
              <SingleCoin className="h-4" />
            ) : (
              <DoubleCoin className="h-4" />
            )}
          </div>
          <h3 className="font-semibold font-montserrat text-sm text-primary-white dark:text-primary-white mb-1">
            {item.coins} coins
          </h3>
        </div>

        <div>
          <h3 className="text-[32px] font-droid text-primary-white dark:text-primary-white mb-1 w-max">
            £ {item.amount}
          </h3>
        </div>

      </div>
    </div>
  );
};

export default WalletCard;
