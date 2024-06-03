import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Appointment.css';

const Calendar = ({ onDateSelect }) => {
    const { t } = useTranslation();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const daysInMonth = () => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const days = [];

        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    };

    const selectDate = (date) => {
        setSelectedDate(date);
        onDateSelect(date);
    };

    return (
        <div className="calendar">
            <div className="month-header">
                <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>
                    &lt;
                </button>
                <h3>{t(' ' + (selectedDate.getMonth() + 1))}, {selectedDate.getFullYear()}</h3>
                <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>
                    &gt;
                </button>
            </div>
            <div className="days-grid">
                {daysInMonth().map((date, index) => (
                    <div key={index} className="day" onClick={() => selectDate(date)}>
                        {date.getDate()}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
