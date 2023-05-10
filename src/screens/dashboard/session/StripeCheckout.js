import { Button } from '@deposits/ui-kit-react'
import React from 'react'
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const item = {
  price: 'price_1N3bs4C5jMMbIlE86HWGadBM',
  quantity: 1
}

const options = {
  lineItems: [item],
  mode: 'payment',
  successUrl: `${window.location.origin}/dashboard/session`,
  cancelUrl: `${window.location.origin}/dashboard/session`,
};



const StripeCheckoutComp = () => {

  const goToCheckout = async () => {
    console.log('Redirecting to checkout...');
    if (!stripePromise) return

    const res = await stripePromise
    const { error } = await res.redirectToCheckout(options)

    error && console.error(error);
  }

  return (
    <div>
      <section>
        {stripePromise &&
          <div>
            <button onClick={goToCheckout} className='border'>
              Checkout
            </button>
          </div>
        }
      </section>
    </div>
  )
}

export default StripeCheckoutComp