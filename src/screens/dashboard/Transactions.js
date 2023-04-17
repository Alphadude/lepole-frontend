import React from 'react'
import { allTransactions } from '../../utils/dummyData';
import { createColumnHelper } from '@tanstack/react-table';
import Tables from '../../components/Tables';
import { ReactComponent as Filter } from '../../assets/icons/filter.svg';

const Transactions = ({
  loading = false,
  rows = allTransactions,
}) => {
  const columnHelper = createColumnHelper();

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

      <h2 className="mt-6 text-xl font-droid font-bold text-renaissance-black dark:text-primary-white">
       All Transactions
      </h2>

      <p className="mt-2 text-base font-montserrat font-normal text-renaissance-black dark:text-primary-white">
        View all transaction
      </p>

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
        <div className='mt-8'>
          <div className='flex justify-end space-x-8'>
            <div className='flex p-2 space-x-2 rounded-md bg-filter-bg dark:bg-dark-white'>
                <Filter className="h-8" />

                <p className="mt-2 text-sm font-normal text-renaissance-black dark:text-table-dark-text">
                Filter by: Amount
                </p>
            </div>

            <div className='flex p-2 space-x-2 rounded-md bg-filter-bg dark:bg-dark-white'>
                <Filter className="h-8" />

                <p className="mt-2 text-sm font-normal text-renaissance-black dark:text-table-dark-text">
                Filter by: Date
                </p>
            </div>
            
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

export default Transactions;
