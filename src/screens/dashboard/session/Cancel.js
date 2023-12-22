import React from 'react';
import SessionsLayout from '../../../components/layouts/SessionsLayout';
import { createColumnHelper } from '@tanstack/react-table';
import Tables from '../../../components/Tables';

import moment from 'moment';
import gymCouple from '../../../assets/images/gym_couple.png';

import { useGetCancelRequest } from '../../../helpers/hooks/queries/useSessions';

const Cancel = () => {
  const { data, isLoading } = useGetCancelRequest();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((row) => 'Session', {
      id: 'Session',
      cell: (info) => {
        const value = info.row.original;

        return (
          <div className="text-priBlack  text-sm capitalize">
            <span> {value.session?.type} </span>
          </div>
        );
      },
    }),

    columnHelper.accessor((row) => 'Date', {
      id: 'Date ',
      cell: (info) => {
        const value = info.row.original;

        return (
          <div className="text-sm">
            <span className=" text-sm text-priBlack">
              {moment(value?.session?.date).format('Do MMMM, YYYY')}
            </span>
          </div>
        );
      },
    }),

    columnHelper.accessor((row) => row.role, {
      id: 'Hours',
      cell: (info) => (
        <span className="text-priBlack text-sm ">
          {info.row.original.session?.duration}
        </span>
      ),
    }),

    columnHelper.accessor((row) => row.role, {
      id: 'Start Time',
      cell: (info) => (
        <span className="text-priBlack text-sm">
          {moment(info.row.original.session?.startTime).format('h:mm A')}
        </span>
      ),
    }),

    columnHelper.accessor((row) => row.role, {
      id: 'End Time',
      cell: (info) => (
        <span className="text-priBlac text-sm">
          {moment(info.row.original.session?.endTime).format('h:mm A')}
        </span>
      ),
    }),

    columnHelper.accessor((row) => 'status', {
      id: 'Status',
      cell: (info) => {
        const { status } = info.row.original;
        let statusStyle;

        switch (status) {
          case 'rejected':
            statusStyle = ' text-red-700 bg-red-500/60 ';
            break;
          case 'approved':
            statusStyle = 'text-green-700 bg-green-500/60';
            break;
          default:
            statusStyle = ' text-yellow-700 bg-yellow-500/60  ';
            break;
        }

        return (
          <p className="flex items-center gap-2">
            <span
              className={`inline-flex w-2 h-2 ${statusStyle} rounded-full `}
            />
            {status}
          </p>
        );
      },
    }),
  ];

  return (
    <SessionsLayout>
      {isLoading ? (
        <div className=" text-center pt-52 ">
          <p> loading... </p>
        </div>
      ) : data?.data?.length === 0 ? (
        <section className=" py-20 lg:py-12 w-full h-full flex justify-center items-center">
          <div className="flex flex-col items-center">
            <img
              src={gymCouple}
              alt="empty state"
              className="w-3/5 lg:w-full"
            />
            <p className="mt-10 mb-8">No Cancel request yet.</p>
          </div>
        </section>
      ) : (
        <section className="text-xs mt-6 w-full  font-normal">
          <Tables columns={columns} data={data?.data} />
        </section>
      )}
    </SessionsLayout>
  );
};

export default Cancel;
