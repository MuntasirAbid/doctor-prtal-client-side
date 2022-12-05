import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { authContext } from '../../../Contexts/AuthProvider';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const { name, slots, price } = treatment; //treatment is appointment option, just different name
    const date = format(selectedDate, 'PP');
    const { user } = useContext(authContext);

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const yourName = form.yourName.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const booking = {
            appointmentDate: date,
            treatment: name,
            patient: yourName,
            slot,
            email,
            phone,
            price
        }

        fetch('http://localhost:12000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('Booking confirmed')
                    refetch();
                }
                else {
                    toast.error(data.message)
                }
            })


    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-6'>
                        <input type="text" disabled value={date} className="input w-full input-bordered max-w-" />
                        <select name='slot' className="select select-bordered w-full">

                            {
                                slots.map((slot, i) => <option
                                    value={slot}
                                    key={i}
                                >{slot}</option>)
                            }
                        </select>
                        <input name='yourName' type="text" placeholder="Your Name" defaultValue={user?.displayName} disabled className="input w-full input-bordered" />
                        <input name='email' type="text" placeholder="Your Email" defaultValue={user?.email} disabled className="input w-full input-bordered" />
                        <input name='phone' type="number" placeholder="Phone Number" className="input w-full input-bordered" />


                        <br />
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;