import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const booking = useLoaderData();
    console.log('booking data', booking)
    return (
        <div>
            <h3 className="text-3xl">Payment</h3>
        </div>
    );
};

export default Payment;