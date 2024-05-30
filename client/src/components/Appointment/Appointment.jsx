import React from 'react';
import { useTranslation } from 'react-i18next';
import '../Appointment/Appointment.css';

const Appointment = () => {
    const { t } = useTranslation();

    return (
        <h1>
            Appointment
        </h1>
    );
};

export default Appointment;
