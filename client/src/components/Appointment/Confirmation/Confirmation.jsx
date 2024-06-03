// Confirmation.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Confirmation.css';

const Confirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { date, time, name } = location.state || {}; // Extract name from state

    const [countdown, setCountdown] = useState(60);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        const redirectTimer = setTimeout(() => {
            navigate('/');
        }, 60000);

        return () => {
            clearInterval(timer);
            clearTimeout(redirectTimer);
        };
    }, [navigate]);

    return (
        <div className='confirmation-container'>
            <h1>Termin erfolgreich gebucht!</h1>
            <p>Vielen Dank für Ihre Buchung, {name}.</p> {/* Display name here */}
            {date && time && (
                <div className='appointment-summary'>
                    <h2>Zusammenfassung</h2>
                    <ul>
                        <li><strong>Name:</strong> {name}</li>
                        <li><strong>Datum:</strong> {date}</li>
                        <li><strong>Uhrzeit:</strong> {time}</li>
                        <li><strong>Dienst:</strong> Haare locken</li>
                        <li><strong>Ort:</strong> Friseursalon Bochum</li>
                    </ul>
                </div>
            )}
            <p>Sie werden in <strong>{countdown}</strong> Sekunden zur Startseite weitergeleitet oder <span className="redirect-link" onClick={() => navigate('/')}>klicken Sie hier</span>, um sofort zurückzukehren.</p>
        </div>
    );
};

export default Confirmation;