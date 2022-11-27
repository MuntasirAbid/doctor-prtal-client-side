import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvaiableAppointments from '../AvaileableAppointments/AvaiableAppointments';

const Appointment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div>
            <AppointmentBanner
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            ></AppointmentBanner>
            <AvaiableAppointments
                selectedDate={selectedDate}
            ></AvaiableAppointments>
        </div>
    );
};

export default Appointment;