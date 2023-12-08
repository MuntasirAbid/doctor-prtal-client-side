
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvaiableAppointments = ({ selectedDate }) => {

    const [appointmentOptions, setAppointmentOptions] = useState([]);
    const [treatment, setTreatment] = useState(null)


    // const { data: appointmentOptions = [], refetch, isLoading } = useQuery({
    //     queryKey: ['appointmentOption', date],
    //     queryFn: async () => {
    //         const res = await fetch(`https://doctors-portal-server-side-nine.vercel.app/appointmentOptions?date=${date}`);
    //         const data = await res.json();
    //         return data
    //     }
    // });

    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        if (selectedDate === undefined) {
            setAppointmentOptions([]);
            return;
        }

        const date = format(selectedDate, 'PP');
        setIsLoading(true);
        fetch(`https://doctors-portal-server-side-nine.vercel.app/appointmentOptions?date=${date}`)
            .then(res => res.json())
            .then(data => { setAppointmentOptions(data); setIsLoading(false) })
    }, [selectedDate]);

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        < section className='my-16' >
            {selectedDate ?
                <p className='text-center text-secondary font-bold'>Available appointment date on: {format(selectedDate, "PP")} </p> :
                <p className='text-center text-secondary font-bold'>Please select a date </p>}

            <div className='grid justify-items-center'>
                <div id='list' className=' grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mt-6 '>
                    {
                        appointmentOptions.map(option => <AppointmentOption
                            key={option._id}
                            appointmentOption={option}
                            setTreatment={setTreatment}
                        ></AppointmentOption>)
                    }
                </div>
            </div>
            {
                treatment &&
                <BookingModal
                    selectedDate={selectedDate}
                    treatment={treatment}
                    setTreatment={setTreatment}
                // refetch={refetch}
                ></BookingModal>
            }
        </section >
    );
};

export default AvaiableAppointments;