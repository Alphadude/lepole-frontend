import React from 'react'
import SessionsLayout from '../../../components/layouts/SessionsLayout'
import { createColumnHelper } from '@tanstack/react-table';
import Tables from '../../../components/Tables';
// import Loader from '../../../components/Loader';

const upComingRows = [
  {
    session: 'Off Peak',
    date: '9th March, 2023',
    hours: '3 hours',
    start: '12:00 AM',
    end: '3:00 AM',
    time: '3:00 AM',
    status: 'completed',
  }
]


const Upcoming = ({
  loading = false,
  rows = upComingRows,
  currentPage,
  setCurrentPage,
  totalPage,
  limit,
}) => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((row) => 'Session', {
      id: 'Session',
      cell: (info) => {
        const value = info.row.original;

        return (
          <div className="text-priBlack  text-sm capitalize">
            <span> {value.session} </span>
          </div>
        );
      },
    }),

    columnHelper.accessor((row) => 'Date', {
      id: 'Date ',
      cell: (info) => {
        const { date, time } = info.row.original;

        return (
          <div className="text-sm">
            <span className=" text-sm text-priBlack">{date}</span>
          </div>
        );
      },
    }),

    // columnHelper.accessor((row) => row.role, {
    //   id: 'Time',
    //   cell: (info) => (
    //     <span className="text-priBlack text-sm ">
    //       {info.row.original.time}
    //     </span>
    //   ),
    // }),

    columnHelper.accessor((row) => row.role, {
      id: 'Hours',
      cell: (info) => (
        <span className="text-priBlack text-sm ">
          {info.row.original.hours}
        </span>
      ),
    }),


    columnHelper.accessor((row) => row.role, {
      id: 'Start Time',
      cell: (info) => (
        <span className="text-priBlack text-sm">
          {info.row.original.start}
        </span>
      ),
    }),

    columnHelper.accessor((row) => row.role, {
      id: 'End Time',
      cell: (info) => (
        <span className="text-priBlac text-sm">
          {info.row.original.end}
        </span>
      ),
    }),

    columnHelper.accessor((row) => 'status', {
      id: 'Status',
      cell: (info) => {
        const { status } = info.row.original;
        let statusStyle;

        switch (status) {
          case 'pending':
            statusStyle = 'bg-yellow-500';
            break;
          case 'incomplete':
            statusStyle = 'bg-red-500';
            break;
          case 'completed':
            statusStyle = 'bg-green-500';
            break;
          default:
            statusStyle = '';
            break;
        }

        return (
          <p className='flex items-center gap-2'>
            <span
              className={`inline-flex w-2 h-2 ${statusStyle} rounded-full `}
            />
            {status}
          </p>
        );
      },
    }),

    // columnHelper.accessor(() => 'actions', {
    //   id: 'Actions',
    //   cell: (info) => {
    //     const { row } = info;
    //     const applicant = row?.original;

    //     return (
    //       <button>
    //         <p className='underline hover:no-underline'>Reschedule</p>
    //       </button>
    //     );
    //   },
    // }),
  ];

  return (
    <SessionsLayout>
      {loading ? (
        <div>

        </div>
      ) : rows?.length < 1 ? (
        <div className="p-6 rounded-lg bg-neutral-black-700">
          <p className="mt-20 text-gray-500 text-2xl text-center font-medium">
            No Record Found
          </p>
        </div>
      ) : (
        <div className='text-xs mt-6 font-normal'>
          <Tables
            columns={columns}
            data={rows}
          // currentPage={currentPage}
          // setCurrentPage={setCurrentPage}
          // totalPage={totalPage}
          />
        </div>
      )}
    </SessionsLayout>
  );
};





export default Upcoming