import React from 'react'
import SessionsLayout from '../../../components/layouts/SessionsLayout'
import gymCouple from '../../../assets/images/gym_couple.png'
import { Button } from '@deposits/ui-kit-react'
import { Link } from 'react-router-dom'
import { routes } from '../../../router/routes'
import Tables from '../../../components/Tables'
import { createColumnHelper } from '@tanstack/react-table'
import { useActiveSessions, useSessions } from '../../../helpers/hooks/queries/useSessions'
import moment from 'moment'

const upComingRows = [
  {
    amount: 6,
    created_at: "2023-04-23T00:50:24.922936+00:00",
    date: "2023-04-23",
    duration: "3 hrs",
    endTime: "2023-04-23T02:00:00+00:00",
    id: 35,
    paymentType: "coin balance",
    startTime: "2023-04-22T23:00:00+00:00",
    status: "pending",
    type: "Off PeaK",
    user_id: "c753c13c-4218-4e44-9420-7c90be48cf0d",
  }
]


const Active = ({
  loading = false,
  rows = upComingRows,
  currentPage,
  setCurrentPage,
  totalPage,
  limit,
}) => {
  const { data, isLoading } = useActiveSessions()

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

    columnHelper.accessor((row) => 'Code', {
      id: 'Access Code',
      cell: (info) => {
        const value = info.row.original;

        return (
          <div className="text-sm">
            {value?.passcode
              || <>
                Unavailable
                [<a href={`mailto:contact@lepoleltd.com?subject=Lepole%20Booking%20App%20Access%20Code%20Request`}
                  target='_blank' rel='noreferrer' className=" text-sm text-primary-blue"
                >
                  contact support
                </a>]
              </>
            }
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
            <Link to={`/${routes.dashboard_home}/${routes.session}/${routes.new}`} className=' flex justify-end '>
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
            </Link>

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
  )
}

export default Active