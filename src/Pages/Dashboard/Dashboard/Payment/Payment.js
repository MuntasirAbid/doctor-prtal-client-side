import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLoaderData } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

console.log(stripePromise)

const Payment = () => {
    const booking = useLoaderData();
    const { treatment, price, slot, appointmentDate } = booking;
    return (
        <div>
            <h3 className="text-3xl">Payment for {treatment}</h3>
            <p className="text-xl">Please pay ${price} for your appointment on {appointmentDate} at {slot}</p>
        </div>
    );
};

export default Payment;