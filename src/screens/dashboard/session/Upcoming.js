import React, { useState } from 'react';
import SessionsLayout from '../../../components/layouts/SessionsLayout';
import { createColumnHelper } from '@tanstack/react-table';
import Tables from '../../../components/Tables';
import ModalContainer from '../../../components/layouts/ModalContainer';
import { RescheduleModal, CancelModal } from '../../../components/Modals';
import { ManageCancellation } from '../../../components/sections';
import {
  useSessions,
  useUpcomingSessions,
} from '../../../helpers/hooks/queries/useSessions';
// import Loader from '../../../components/Loader';
import gymCouple from '../../../assets/images/gym_couple.png';
import { Link } from 'react-router-dom';
import { Button } from '@deposits/ui-kit-react';
import { routes } from '../../../router/routes';
import { plans } from '../../../utils/dummyData';
import moment from 'moment';

import { isRefundEligible, canReschedule } from '../../../helpers/functions';

export const initialDataSessions = {
  id: '',
  planId: 0,
  data: {
    amount: 0,
    created_at: '',
    date: '',
    duration: '',
    endTime: '',
    id: 0,
    paymentType: '',
    startTime: '',
    status: '',
    type: '',
    user_id: '',
  },
};

const Upcoming = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);

  const [selectedSession, setSelectedSession] = useState(initialDataSessions);

  const { data, isLoading } = useUpcomingSessions();

  const toggleModal = (session) => {
    setModalOpen((prev) => !prev);
    session?.id && setSelectedSession(session);
  };

  const cancelToggle = (session) => {
    setOpenCancel((prev) => !prev);
    session?.id && setSelectedSession(session);
  };

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
      id: 'Date',
      cell: (info) => {
        const { date, time } = info.row.original;

        return (
          <div className="text-sm">
            <span className=" text-sm text-priBlack">
              {moment(date).format('Do MMMM, YYYY')}
            </span>
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
            {value?.passcode || (
              <>
                Unavailable [
                <a
                  href={`mailto:contact@lepoleltd.com?subject=Lepole%20Booking%20App%20Access%20Code%20Request`}
                  target="_blank"
                  rel="noreferrer"
                  className=" text-sm text-primary-blue"
                >
                  contact support
                </a>
                ]
              </>
            )}
          </div>
        );
      },
    }),

    columnHelper.accessor((row) => row.role, {
      id: 'Time',
      cell: (info) => (
        <span className="text-priBlack text-sm ">
          {moment(info.row.original.startTime).format('h:mm A')}
        </span>
      ),
    }),

    columnHelper.accessor((row) => row.role, {
      id: 'Hours',
      cell: (info) => (
        <span className="text-priBlack text-sm ">
          {info.row.original.duration}
        </span>
      ),
    }),

    columnHelper.accessor(() => 'actions', {
      id: 'actions',
      cell: (info) => {
        const {
          row: { original },
        } = info;

        const allowedHours = original?.payment === 'coin balance' ? 4 : 8;
        const userCanCancel = isRefundEligible(
          original?.startTime,
          allowedHours,
        );

        const minutesWindow = 30;

        const rescheduleStatus = canReschedule(
          original?.startTime,
          minutesWindow,
        );

        const setModalValues = () => {
          toggleModal({
            planId: original.planId,
            id: original.id,
            data: original,
          });
        };

        const setCancelValues = () => {
          cancelToggle({
            planId: original.planId,
            id: original.id,
            data: original,
          });
        };

        return (
          <div style={{ overflow: 'visible' }}>
            <ManageCancellation
              userCanCancel={userCanCancel}
              setModalValues={setModalValues}
              setCancelValues={setCancelValues}
              canReschedule={rescheduleStatus}
            />
          </div>
        );
      },
    }),
  ];

  return (
    <SessionsLayout>
      {modalOpen && (
        <ModalContainer
          scrollable
          modalOpen={modalOpen}
          toggleModal={toggleModal}
          back={true}
        >
          <RescheduleModal
            toggleModal={toggleModal}
            setSelectedSession={setSelectedSession}
            selectedSession={selectedSession}
            planId={selectedSession?.planId}
          />
        </ModalContainer>
      )}

      {openCancel && (
        <ModalContainer
          scrollable
          modalOpen={cancelToggle}
          toggleModal={cancelToggle}
        >
          <CancelModal
            toggleModal={cancelToggle}
            setSelectedSession={setSelectedSession}
            selectedSession={selectedSession}
            planId={selectedSession?.planId}
          />
        </ModalContainer>
      )}

      {isLoading ? (
        <div className=" text-center pt-52 ">
          <p> loading... </p>
        </div>
      ) : data?.data?.length === 0 ? (
        <section className=" py-16 lg:py-12 qw-full h-full flex justify-center items-center">
          <div className="flex flex-col items-center">
            <img
              src={gymCouple}
              alt="empty state"
              className="w-3/5 lg:w-full"
            />
            <p className="mt-10 mb-8">
              Oops! You do not have any upcoming session
            </p>
            <Link
              to={`/${routes.dashboard_home}/${routes.session}/${routes.new}`}
            >
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
        <section className="text-xs mt-6 w-full  font-normal">
          <Link
            to={`/${routes.dashboard_home}/${routes.session}/${routes.new}`}
            className=" flex justify-end "
          >
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

          <Tables columns={columns} data={data?.data} />
        </section>
      )}
    </SessionsLayout>
  );
};

export default Upcoming;
