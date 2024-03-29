import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { routes } from '../../router/routes'
import { createColumnHelper } from '@tanstack/react-table';
import Tables from '../../components/Tables';
import { transactionHistory } from '../../utils/dummyData';
import { bundle } from '../../utils/dummyData';
import WalletCard from '../../components/sections/wallet/WalletCard';
import { ReactComponent as IconInfo } from '../../assets/icons/icon-Info.svg';
import { ReactComponent as SingleCoin } from '../../assets/icons/single-coin.svg';
import { useTransactions } from '../../helpers/hooks/queries/useTransactions';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import getStripe from '../../getStripe'

import {
  useProfile,
  useUpcomingSessions,
} from '../../helpers/hooks/queries/useSessions';

import { H4, P } from '../../components/Headings';
import ModalContainer from '../../components/layouts/ModalContainer';
import StripeCheckoutComp from './session/StripeCheckout';
import { QueryClient, useQueryClient } from 'react-query';



const defaultCoinBuyData = {
  user_id: '4f6881f1-74f0-4d14-97e3-793789345357',
  username: `Kainy Chike-Onyechi`,
  payment: "stripe",
  amount: 54,
  coin_amount: 8,
}



const transactionsData = {
  amount: 10,
  created_at: "2023-04-24T09:34:44.340515+00:00",
  description: "Session Booking",
  id: 19,
  status: "coin balance",
  user_id: "a9767173-2dda-40d5-9ad1-4e6350763151",
}

const howList = [
  'Use your coins on morning, afternoon or evening sessions.',
  'Buy and manage coins in-app anytime.'
]



const Wallet = ({
  rows = transactionHistory,
}) => {

  const [hoveredToolTip, setHoveredToolTip] = useState(false)
  const [modalOpen, setModalOpen] = useState('')
  const [loading, setLoading] = useState(false)
  const [purchseData, setPurchseData] = useState(defaultCoinBuyData)


  const toggleStripePaymentModal = () => {
    setModalOpen(prev => prev !== 'stripe-payment' ? 'stripe-payment' : '')
  }

  const { data: sessions } = useUpcomingSessions();
  const queryClient = useQueryClient()

  const { data: user } = useProfile();

  const columnHelper = createColumnHelper();

  const lastItem = bundle[bundle?.length - 1];

  const { data: transactions } = useTransactions();

  const [cookies] = useCookies(['user']);

  const id = cookies?.user?.id;

  const email = cookies?.user?.email;

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
        const { amount } = info.row.original;

        return (
          <div className="text-sm">
            <span className=" text-sm text-priBlack">{amount}</span>
          </div>
        );
      },
    }),

    columnHelper.accessor((row) => row.role, {
      id: 'PAYMENT DATE',
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



  const handleCheckout = (item) => {
    const { id, firstname, lastname } = cookies?.user;

    setPurchseData({
      payment_kind: "purchase-coins",
      amount: item.amount * 100,
      coin_amount: item.coins,
      payment: 'stripe',
      user_id: id,
      username: `${firstname} ${lastname}`,
    })
    toggleStripePaymentModal()
  }


  return (
    <>
      {modalOpen === 'stripe-payment' && (
        <ModalContainer modalOpen={modalOpen} toggleModal={toggleStripePaymentModal}>
          <StripeCheckoutComp toggleModal={toggleStripePaymentModal} loading={loading} sessionData={purchseData} type={"purchase-coins"} />
        </ModalContainer>
      )}

      <section className='p-6 md:p-8 lg:px-6 xl:px-12'>

        <div className='flex space-x-1 items-center'>
          <p className="mt-2 text-base font-montserrat font-normal text-renaissance-black dark:text-primary-white">
            How coins work
          </p>
          <div
            onMouseOver={() => setHoveredToolTip(true)}
            onMouseOut={() => setHoveredToolTip(false)}
            onClick={() => setHoveredToolTip(prev => !prev)}
            className='relative '
          >
            <IconInfo className="h-8" />

            <div className={` ${hoveredToolTip ? 'block' : 'hidden'} absolute sm:left-auto -left-16 p-5 z-10 w-60 sm:w-80 rounded-xl bg-white dark:bg-table-border-gray drop-shadow-3xl `}>
              <H4 className='mb-2 '>HOW COINS WORK</H4>
              <div>
                {howList.map(item => (
                  <P key={item} className=''>  <span className={`inline-flex w-2 h-2 mr-2 bg-renaissance-black dark:bg-renaissance-dark-black rounded-full `} />
                    {item}
                  </P>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 space-x-2'>
          <span className="mt-2 text-base font-montserrat font-normal text-renaissance-black dark:text-primary-white">
            Coin Balance
          </span>
          <span
            className='text-5xl font-droid font-bold text-renaissance-black dark:text-primary-white'
            onClick={() => {
              queryClient.invalidateQueries('profile')
              queryClient.invalidateQueries('transactions')
            }}
          >
            {
              user?.data?.user?.user_metadata?.wallet
                ? user?.data?.user?.user_metadata?.wallet
                : '...'
            }
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
            <WalletCard key={item.id} item={item} lastItem={lastItem} onClick={() => handleCheckout(item)} />
          ))}
        </section>

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
          <div>
            <div className='flex justify-between'>
              <p className="mt-2 text-lg font-montserrat font-semibold text-renaissance-black dark:text-primary-white">
                Transaction History
              </p>

              {transactions?.data?.length !== 0 && (
                <Link to={`/${routes.dashboard_home}/${routes.wallet}/${routes.transaction}`}>
                  <p className="mt-2 text-sm font-normal text-renaissance-black underline hover:no-underline  dark:text-primary-white">
                    View all transaction
                  </p>
                </Link>
              )}



            </div>

            <div className='text-xs mt-6 font-normal overflow-auto'>

              {transactions?.data?.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-base font-semibold text-renaissance-black dark:text-primary-white">
                  <SingleCoin className="h-20" />
                  You do not have any transaction yet.
                </div>
              ) : (
                <Tables
                  columns={columns}
                  data={transactions?.data?.slice(0, 4) || []}
                />
              )}

            </div>
          </div>

        )}
      </section>
    </>
  );
};

export default Wallet;
