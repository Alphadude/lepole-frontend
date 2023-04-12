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

    columnHelper.accessor((row) => row.role, {
      id: 'Time',
      cell: (info) => (
        <span className="text-priBlack text-sm ">
          {info.row.original.time}
        </span>
      ),
    }),

    columnHelper.accessor((row) => row.role, {
      id: 'Hours',
      cell: (info) => (
        <span className="text-priBlack text-sm ">
          {info.row.original.hours}
        </span>
      ),
    }),


    // columnHelper.accessor((row) => row.role, {
    //   id: 'Start Time',
    //   cell: (info) => (
    //     <span className="text-priBlack text-sm font-semibold">
    //       {info.getValue()}
    //     </span>
    //   ),
    // }),

    // columnHelper.accessor((row) => row.role, {
    //   id: 'End Time',
    //   cell: (info) => (
    //     <span className="text-priBlac text-sm font-semibold">
    //       {info.getValue()}
    //     </span>
    //   ),
    // }),

    // rows?.status
    // && columnHelper.accessor((row) => 'status', {
    //   id: 'Status',
    //   cell: (info) => {
    //     const { status } = info.row.original;
    //     let statusStyle;

    //     switch (status) {
    //       case 'pending':
    //         statusStyle = 'bg-[#FFF0DB] text-[#E08304]';
    //         break;
    //       case 'rejected':
    //         statusStyle = 'bg-lightRed text-[#842432]';
    //         break;
    //       case 'accepted':
    //         statusStyle = 'text-[#158957] bg-lightGreen';
    //         break;
    //       default:
    //         statusStyle = 'bg-[#FFF0DB] text-[#E08304]';
    //         break;
    //     }
    //     return (
    //       <span
    //         className={`flex justify-center py-[4px] ${statusStyle} rounded-2xl`}
    //       >
    //         {status}
    //       </span>
    //     );
    //   },
    // }),

    columnHelper.accessor(() => 'actions', {
      id: 'Actions',
      cell: (info) => {
        const { row } = info;
        const applicant = row?.original;

        return (
          <button>
            <p className='underline hover:no-underline'>Reschedule</p>
          </button>
        );
      },
    }),
  ];

  return (
    <SessionsLayout>
      {loading ? (
        <div>

        </div>
      ) : rows?.length < 1 ? (
        <div className="p-6 rounded-lg ">
          <p className="mt-20 text-gray-500 text-2xl text-center font-medium">
            No Session Found
          </p>
        </div>
      ) : (
        <div className='text-xs flex-1 mt-6 font-normal w-5/12 md:w-full overflow-auto'>
          <Tables
            columns={columns}
            data={rows}
          />
        </div>
      )}
    </SessionsLayout>
  );
};





export default Upcoming