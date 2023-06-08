// import { Button } from '@deposits/ui-kit-react'
// import React from 'react'
// import { loadStripe } from '@stripe/stripe-js';


// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
// const stripeProvider = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// const item = {
//   price: 'price_1N3bs4C5jMMbIlE86HWGadBM',
//   quantity: 1
// }

// const options = {
//   lineItems: [item],
//   mode: 'payment',
//   successUrl: `${window.location.origin}/dashboard/session`,
//   cancelUrl: `${window.location.origin}/dashboard/session`,
// };



// const StripeCheckoutComp = () => {

//   const goToCheckout = async () => {
//     console.log('Redirecting to checkout...');
//     if (!stripePromise) return

//     const res = await stripePromise

//     const { error } = await res.redirectToCheckout({
//       ...options,
//       lineItems: [

//       ]

//     })

//     error && console.error(error);
//   }

//   return (
//     <div>
//       <section>
//         {stripePromise &&
//           <div>
//             <button onClick={goToCheckout} className='border'>
//               Checkout
//             </button>
//           </div>
//         }
//       </section>
//     </div>
//   )
// }

// export default StripeCheckoutComp




import React, { useState, useEffect, useCallback, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import { useCookies } from "react-cookie";
import moment from "moment";
import { H4 } from "../../../components/Headings";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);


// const { id, firstname, lastname } = cookies?.user;
const today = new Date()
const start = [today.getFullYear(), today.getMonth(), today.getDate(), 17]
const end = [today.getFullYear(), today.getMonth(), today.getDate(), 18]

export const defaultSessionData = {
  id: "book-session",
  currency: 'gbp',
  metadata: {
    user_id: '4f6881f1-74f0-4d14-97e3-793789345357',
    username: `Kainy Chike-Onyechi`,
    payment: "stripe",
    amount: 25 * 100,
    type: 'Afternoon',
    date: moment(today).format('YYYY-MM-DD'),
    duration: `${1} hours`,
    startTime: new Date(...start).toISOString(),
    endTime: new Date(...end).toISOString(),
  }
}


const defaultCoinBuyData = {
  id: "purchase-coins",
  currency: 'gbp',
  metadata: {
    user_id: '4f6881f1-74f0-4d14-97e3-793789345357',
    username: `Kainy Chike-Onyechi`,
    payment: "stripe",
    amount: 54,
    coin_amount: 8,
  }
}

export default function StripeCheckoutComp({ sessionData, type }) {
  const [clientSecret, setClientSecret] = useState("");

  useMemo(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://student-complaint.onrender.com/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: type,
        currency: 'gbp',
        metadata: sessionData
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.client_secret)
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div onClick={e => e.stopPropagation()} className="container max-w-3xl bg-white dark:bg-table-border-gray min-h-[500px] p-10 py-20 flex flex-col md:flex-row items-cente gap-5" >
      {!clientSecret ? (
        <div className=" mx-auto my-auto">
          Loading...
        </div>
      ) : (
        <>
          <section className="flex-[2] text-renaissance-black dark:text-renaissance-dark-black ">
            <H4>Stripe Payment</H4>
            <p className=" text-primary-gray dark:text-gray-3 font-normal mt-8 mb-">
              {/* Type: */}
              <span className="capitalize "> {type?.replace('-', ' ')} </span>
            </p>
            <p className="text-4xl font-semibold "> £{(sessionData.amount / 100)?.toFixed(2)}  </p>
            <p className=" text-primary-gra font-semibold"> {sessionData?.type ? `${sessionData?.type} - ${sessionData?.duration}` : ''}</p>
          </section>

          <section className=" flex-[3] self-center">
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm clientSecret={clientSecret} />
              </Elements>
            )}
          </section>
        </>
      )}
    </div>
  );
}