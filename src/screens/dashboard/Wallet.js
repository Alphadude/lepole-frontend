import React from 'react';
import { Link } from 'react-router-dom'
import { routes } from '../../router/routes'
import { createColumnHelper } from '@tanstack/react-table';
import Tables from '../../components/Tables';
import { transactionHistory } from '../../utils/dummyData';
import { bundle } from '../../utils/dummyData';
import WalletCard from '../../components/sections/wallet/WalletCard';
import { ReactComponent as IconInfo } from '../../assets/icons/icon-Info.svg';

const Wallet = ({
  loading = false,
  rows = transactionHistory,
}) => {
  const columnHelper = createColumnHelper();

  const lastItem = bundle[bundle?.length - 1];

  const columns = [
    columnHelper.accessor((row) => 'DESCRIPTION', {
      id: 'DESCRIPTION',
      cell: (info) => {
        const value = info.row.original;

        return (
          <div>
            <span className='text-priBlack text-[12px] font-medium'> {value.title} </span>
            <p className='text-grey-2 text-[10px] font-normal'>{value.description}</p>
          </div>
        );
      },
    }),

    columnHelper.accessor((row) => 'AMOUNT', {
      id: 'AMOUNT ',
      cell: (info) => {
        const { amount, price } = info.row.original;

        return (
          <div className="text-sm">
            <span className=" text-sm text-priBlack">{amount}</span>
          </div>
        );
      },
    }),

    columnHelper.accessor((row) => row.role, {
      id: 'DATE',
      cell: (info) => (
        <span className="text-priBlack text-sm ">
          {info.row.original.date}
        </span>
      ),
    }),

    columnHelper.accessor((row) => row.role, {
      id: 'STATUS',
      cell: (info) => (
        <span className="text-priBlack text-sm ">
          {info.row.original.status}
        </span>
      ),
    }),
  ];

  return (
    <section className='p-6 md:p-8 lg:px-6 xl:px-12'>

      <div className='flex space-x-1 items-center'>
        <p className="mt-2 text-base font-montserrat font-normal text-renaissance-black dark:text-primary-white">
        How coins work
      </p>
      <IconInfo className="h-8" />
      </div>

      <div className='mt-6 space-x-2'>
        <span className="mt-2 text-base font-montserrat font-normal text-renaissance-black dark:text-primary-white">
        Coin Balance
      </span>
      <span className='text-5xl font-droid font-bold text-renaissance-black dark:text-primary-white'>
        0.00
      </span>
      </div>

      <h2 className="mt-6 text-xl font-droid font-bold text-renaissance-black dark:text-primary-white">
        No Coin? No Problem
      </h2>

      <p className="mt-2 text-base font-montserrat font-normal text-renaissance-black dark:text-primary-white">
        Buy a bundle and get more with coin bundles
      </p>

      <section className='grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-8 mt-6 mb-12'>
        {bundle.map((item) => (
            <WalletCard key={item.id} item={item} lastItem={lastItem} />
          ))}
      </section>

      {loading ? (
        <div>

        </div>
      ) : rows?.length < 1 ? (
        <div className="p-6 rounded-lg ">
          <p className="mt-20 text-gray-500 text-2xl text-center font-medium">
            No Transaction Found
          </p>
        </div>
      ) : (
        <div>
          <div className='flex justify-between'>
            <p className="mt-2 text-lg font-montserrat font-semibold text-renaissance-black dark:text-primary-white">
              Transaction History
            </p>

            <Link to={`/${routes.dashboard_home}/${routes.wallet}/${routes.transaction}`}>
              <p className="mt-2 text-sm font-normal text-renaissance-black dark:text-primary-white">
              View all transaciton
            </p>
            </Link>
            
          </div>
          <div className='text-xs mt-6 font-normal overflow-auto'>
            <Tables
              columns={columns}
              data={rows}
            />
        </div>
        </div>
        
      )}
    </section>
  );
};

export default Wallet;
