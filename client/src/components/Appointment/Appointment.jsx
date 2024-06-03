import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Appointment.css'; 

const Appointment = () => {
    const { t } = useTranslation();
    const navigate = useNavigate(); // Initialize useNavigate
    const [selectedDate, setSelectedDate] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [showTimeSlots, setShowTimeSlots] = useState(false);

    // Dummy-Daten für verfügbare Uhrzeiten (normalerweise würde man diese von einem Server abrufen)
    const timesForDate = {
        '2024-05-31': ['09:00', '10:00', '11:00', '14:00', '15:00'],
        '2024-06-01': ['08:00', '09:30', '13:00', '16:00'],
        '2024-06-02': ['09:00', '10:00', '11:00', '14:00', '15:00'],
        '2024-06-03': ['08:00', '09:30', '13:00', '16:00'],
        '2024-06-04': ['09:00', '10:00', '11:00', '14:00', '15:00'],
        '2024-06-05': ['08:00', '09:30', '13:00', '16:00'],
        '2024-06-06': ['09:00', '10:00', '11:00', '14:00', '15:00'],
        '2024-06-07': ['08:00', '09:30', '13:00', '16:00'],
        '2024-06-08': ['09:00', '10:00', '11:00', '14:00', '15:00'],
        '2024-06-09': ['08:00', '09:30', '13:00', '16:00'],
        '2024-06-10': ['09:00', '10:00', '11:00', '14:00', '15:00'],
        '2024-06-11': ['08:00', '09:30', '13:00', '16:00'],
        '2024-06-12': ['09:00', '10:00', '11:00', '14:00', '15:00'],
        '2024-06-13': ['08:00', '09:30', '13:00', '16:00'],
        '2024-06-14': ['09:00', '10:00', '11:00', '14:00', '15:00'],
        '2024-06-15': ['08:00', '09:30', '13:00', '16:00'],
        '2024-06-16': ['09:00', '10:00', '11:00', '14:00', '15:00'],
        '2024-06-17': ['08:00', '09:30', '13:00', '16:00'],
        '2024-06-18': ['09:00', '10:00', '11:00', '14:00', '15:00'],
        '2024-06-19': ['08:00', '09:30', '13:00', '16:00'],
        '2024-06-20': ['09:00', '10:00', '11:00', '14:00', '15:00'],
        '2024-06-21': ['08:00', '09:30', '13:00', '16:00'],
        '2024-06-22': ['09:00', '10:00', '11:00', '14:00', '15:00'],
        '2024-06-23': ['08:00', '09:30', '13:00', '16:00'],
        '2024-06-24': ['09:00', '10:00', '11:00', '14:00', '15:00'],
        '2024-06-25': ['08:00', '09:30', '13:00', '16:00'],
        '2024-06-26': ['09:00', '10:00', '11:00', '14:00', '15:00'],
        '2024-06-27': ['08:00', '09:30', '13:00', '16:00'],
    };

    const handleDateSelection = (event) => {
        const date = event.target.value;
        setSelectedDate(date);
        setAvailableTimes(timesForDate[date] || []);
        setShowTimeSlots(true); // Zeige das Pop-up
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
        setShowTimeSlots(false); // Schließe das Pop-up
    };

    const bookAppointment = () => {
        console.log(`Termin gebucht für: ${selectedDate} um ${selectedTime}`);
        navigate('/ContactDetails', { state: { date: selectedDate, time: selectedTime } }); // Weiterleitung zur Bestätigungsseite mit Zustand
    };


    

    return (
        <div className='appointment-container'>
            <div className='header'>
                <h1>{t('Termin Buchen')}</h1>
            </div>
            <div className='calendar-container'>
                <label htmlFor='appointment-date'>{t('Tag auswählen')}</label>
                <input 
                    type='date' 
                    id='appointment-date'
                    value={selectedDate} 
                    onChange={handleDateSelection} 
                />
            </div>
            {showTimeSlots && (
                <TimeSlotPopup
                    t={t}
                    availableTimes={availableTimes}
                    selectedTime={selectedTime}
                    onTimeSelect={handleTimeChange}
                    onClose={() => setShowTimeSlots(false)}
                />
            )}
            <div className='summary-container'>
                <h2>{t('Zusammenfassung')}</h2>
                <ul>
                    <li>{t('Dienst')} - {t('Haare locken')}</li>
                    <li>{t('Ort')} - {t('Friseursalon Bochum')}</li>
                    {selectedTime && <li>{t('Uhrzeit')} - {selectedTime}</li>}
                </ul>
            </div>
            <div className='footer'>
                <button onClick={bookAppointment} disabled={!selectedDate || !selectedTime}>
                    {t('Termin Buchen')}
                </button>
            </div>
        </div>
    );
};

const TimeSlotPopup = ({ t, availableTimes, selectedTime, onTimeSelect, onClose }) => {
    return (
        <div className='time-slot-popup'>
            <div className='popup-header'>
                <h2>{t('Verfügbare Termine')}</h2>
                <button onClick={onClose}>X</button>
            </div>
            <div className='time-slots'>
                {availableTimes.map((time) => (
                    <button
                        key={time}
                        className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => onTimeSelect(time)}
                    >
                        {time}
                    </button>
                ))}
            </div>
        </div>
    );


    
};

export default Appointment;
