import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es'; // Import Spanish locale
import { momentLocalizer } from 'react-big-calendar';
import { useNavigate } from 'react-router-dom';
import './MyCalendar.css'

moment.locale('es'); // Set locale globally
const localizer = momentLocalizer(moment);

function MyCalendar({ username }) {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/events/${username}`)
            .then(response => {
                const myEvents = response.data.map(event => ({
                    ...event,
                    start: new Date(event.start),
                    end: new Date(event.end)
                }));
                setEvents(myEvents);
            })
            .catch(error => console.error('Error fetching events:', error));
    }, [username]);

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div style={{ height: 700 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                views={['month', 'week', 'day']}
                messages={{
                    next: "Siguiente",
                    previous: "Anterior",
                    today: "Hoy",
                    month: "Mes",
                    week: "Semana",
                    day: "Día",
                    allDay: 'Todo el día',
                    agenda: 'Agenda',
                    date: 'Fecha',
                    time: 'Hora',
                    event: 'Evento', // Customize further as needed
                }}
            />
            <div className="button-container">
                <button type="button" onClick={goBack} className="volver-button">Volver</button>
            </div>
        </div>
    );
}

export default MyCalendar;
