import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from './CheckoutForm';
import moment from 'moment';
import { H4 } from '../../../components/Headings';
import Loader from '../../../components/Loader';
import { supabase } from '../../../utils/supabaseConfig';
import { toast } from 'react-toastify';
import {
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError,
} from '@supabase/supabase-js';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// const { id, firstname, lastname } = cookies?.user;
const today = new Date();
const start = [today.getFullYear(), today.getMonth(), today.getDate(), 17];
const end = [today.getFullYear(), today.getMonth(), today.getDate(), 18];

export const defaultSessionData = {
  id: 'book-session',
  currency: 'gbp',
  metadata: {
    payment_kind: 'book-session',
    user_id: '4f6881f1-74f0-4d14-97e3-793789345357',
    username: `Kainy Chike-Onyechi`,
    payment: 'stripe',
    amount: 25 * 100,
    type: 'Afternoon',
    date: moment(today).format('YYYY-MM-DD'),
    duration: `${1} hours`,
    startTime: new Date(...start).toISOString(),
    endTime: new Date(...end).toISOString(),
  },
};

export default function StripeCheckoutComp({ sessionData, type, toggleModal }) {
  const [clientSecret, setClientSecret] = useState('');

  const getIntent = async () => {
    const { data, error } = await supabase.functions.invoke(
      'get-payment-intent',
      {
        body: JSON.stringify({
          metadata: sessionData,
        }),
      },
    );

    if (!error) {
      setClientSecret(data?.client_secret);
    } else {
      if (error instanceof FunctionsHttpError) {
        const errorMessage = await error.context.json();

        toast.error(errorMessage.message);

        toggleModal();
      } else if (error instanceof FunctionsRelayError) {
        toast.error(error.message);

        toggleModal();
      } else if (error instanceof FunctionsFetchError) {
        toast.error(error.message);

        toggleModal();
      }
    }
  };

  useEffect(() => {
    getIntent();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="container max-w-3xl bg-white dark:bg-table-border-gray min-h-[500px] p-10 py-20 flex flex-col md:flex-row items-cente gap-5"
    >
      {!clientSecret ? (
        <div className=" mx-auto my-auto">
          <Loader
            loadingText="Initiating Stripe Payment"
            className="h-96 w-full"
          />
        </div>
      ) : (
        <>
          <section className="flex-[2] text-renaissance-black dark:text-renaissance-dark-black md:text-left text-center ">
            <H4>Stripe Payment</H4>
            <p className=" text-primary-gray dark:text-gray-3 font-normal mt-8 mb-">
              {/* Type: */}
              <span className="capitalize "> {type?.replace('-', ' ')} </span>
            </p>
            <p className="text-4xl font-semibold ">
              {' '}
              £{(sessionData.amount / 100)?.toFixed(2)}{' '}
            </p>
            <p className=" text-primary-gra font-semibold">
              {' '}
              {sessionData?.type
                ? `${sessionData?.type} - ${sessionData?.duration}`
                : `${sessionData?.coin_amount} coins`}
            </p>
          </section>

          <section className=" flex-[3] self-center">
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm
                  clientSecret={clientSecret}
                  kind={sessionData?.payment_kind}
                />
              </Elements>
            )}
          </section>
        </>
      )}
    </div>
  );
}
