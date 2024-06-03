// ContactDetails.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ContactDetails.css'; // Importiere die CSS-Datei für die Kontaktseite

const ContactDetails = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const navigate = useNavigate();
    const location = useLocation();
    const { date, time } = location.state || {}; // Extrahiere Zustand
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hier könntest du die Kontaktdaten speichern, z.B. in localStorage oder einer Datenbank
        // Setze setIsLoggedIn(true), um den Benutzer als eingeloggt zu markieren
        // setIsLoggedIn(true);
        // Navigiere zur Bestätigungsseite
        // Navigiere zur Bestätigungsseite mit Zustand
        navigate('/confirmation', { state: { ...location.state, name: formData.name ,date, time  } });

    };

    return (
        <div className="contact-details-container">
            <h2>Kontaktdaten eingeben</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-Mail:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Telefon:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Weiter</button>
            </form>
        </div>
    );
};

export default ContactDetails;
