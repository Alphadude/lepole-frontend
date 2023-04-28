import React from 'react'
import SessionsLayout from '../../../components/layouts/SessionsLayout'
import { createColumnHelper } from '@tanstack/react-table';
import Tables from '../../../components/Tables';
import { useSessions, useSessionsHistory } from '../../../helpers/hooks/queries/useSessions';
import { routes } from '../../../router/routes';
import { Link } from 'react-router-dom';
import { Button } from '@deposits/ui-kit-react';
// import Loader from '../../../components/Loader';
import gymCouple from '../../../assets/images/gym_couple.png'
import moment from 'moment';


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


const History = ({
  loading = false,
  rows = upComingRows,
  currentPage,
  setCurrentPage,
  totalPage,
  limit,
}) => {

  const { data, isLoading } = useSessionsHistory()
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((row) => 'Session', {
      id: 'Session',
      cell: (info) => {
        const value = info.row.original;

        return (
          <div className="text-priBlack  text-sm capitalize">
            <span> {value.type} </span>
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
            <span className=" text-sm text-priBlack">{moment(date).format('Do MMMM, YYYY')}</span>
          </div>
        );
      },
    }),

    columnHelper.accessor((row) => row.role, {
      id: 'Hours',
      cell: (info) => (
        <span className="text-priBlack text-sm ">
          {info.row.original.duration}
        </span>
      ),
    }),


    columnHelper.accessor((row) => row.role, {
      id: 'Start Time',
      cell: (info) => (
        <span className="text-priBlack text-sm">
          {moment(info.row.original.startTime).format('h:mm A')}
        </span>
      ),
    }),

    columnHelper.accessor((row) => row.role, {
      id: 'End Time',
      cell: (info) => (
        <span className="text-priBlac text-sm">
          {moment(info.row.original.endTime).format('h:mm A')}
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
      {isLoading

        ? <div className=' text-center pt-52 '>
          <p> loading... </p>
        </div>
        : data?.data?.length === 0 ? (
          <section className=' py-16 lg:py-12 w-full h-full flex justify-center items-center'>
            <div className='flex flex-col items-center'>
              <img src={gymCouple} alt="empty state" className='w-3/5 lg:w-full' />
              <p className='mt-10 mb-8'>
                Oops! You do not have any active session
              </p>
              <Link to={`/${routes.dashboard_home}/${routes.session}/${routes.new}`}>
                <Button
                  className="!bg-primary-green !w-full !border-0 !px-8 !text-primary-white"
                  size="xlarge"
                >
                  Book Session
                </Button>
              </Link>
            </div>
          </section>
        ) : (
          <section className='text-xs mt-6 w-full  font-normal'>
            {/* <Link to={`/${routes.dashboard_home}/${routes.session}/${routes.new}`} className=' flex justify-end '>
              <Button
                className="!bg-primary-green border-0 !px-8 mb-6 !text-primary-white !hidden lg:!inline"
                size="large"
              >
                Book New Session
              </Button>
              <Button
                className="!bg-primary-green border-0 !px-4 mb-6 !text-primary-white lg:!hidden"
                size="medium"
              >
                Book New Session
              </Button>
            </Link> */}

            <Tables
              columns={columns}
              data={data?.data}
            // currentPage={currentPage}
            // setCurrentPage={setCurrentPage}
            // totalPage={totalPage}
            />
          </section>
        )
      }

    </SessionsLayout>
  );
};





export default History