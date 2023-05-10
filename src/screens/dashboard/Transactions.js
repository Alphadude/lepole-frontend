import React from 'react'
import { transactionHistory } from '../../utils/dummyData';
import { createColumnHelper } from '@tanstack/react-table';
import Tables from '../../components/Tables';
import { ReactComponent as Filter } from '../../assets/icons/filter.svg';
import { ReactComponent as SingleCoin } from '../../assets/icons/single-coin.svg';
import { useTransactions } from '../../helpers/hooks/queries/useTransactions';
import moment from 'moment';

const Transactions = ({
  loading = false,
  rows = transactionHistory,
}) => {

  const { data: transactions } = useTransactions();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((row) => 'DESCRIPTION', {
      id: 'DESCRIPTION',
      cell: (info) => {
        const value = info.row.original;

        return (
          <div>
            <span className=" text-sm text-priBlack">{value.description}</span>
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
          {moment(info.row.original.created_at).format('D MMMM, YYYY, h:mm:ss A')}
        </span>
      ),
    }),

    columnHelper.accessor((row) => row.role, {
      id: 'PAYMENT TYPE',
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
      ) : transactions?.data?.length < 1 ? (
        <div className="p-6 rounded-lg ">
          <p className="mt-20 text-gray-500 text-2xl text-center font-medium">
            No Transaction Found
          </p>
        </div>
      ) : (
        <div className='mt-8'>
          {/* <div className='flex justify-end space-x-8'>
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
            
          </div> */}
          <div className='text-xs mt-6 font-normal overflow-auto'>
            {transactions?.data?.length === 0 ? (
              <div className="flex flex-col items-center py-10 text-base font-semibold text-renaissance-black dark:text-primary-white">
                <SingleCoin className="h-20" />
                You do not have any transaction yet.
              </div>
            ) : (
              <Tables
                columns={columns}
                data={transactions?.data || []}
              />
            )}
          </div>
        </div>

      )}
    </section>
  );
};

export default Transactions;
