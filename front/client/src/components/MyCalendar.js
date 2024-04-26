import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // default styling
import './MyCalendar.css'

function MyCalendar() {
    const [date, setDate] = useState(new Date());

    const onChange = newDate => {
        setDate(newDate);
    };

    return (
        <div className="calendar-container">
            <h1>MichiCalendario</h1>
            <div className="calendar-display">
                <Calendar
                    onChange={onChange}
                    value={date}
                    showNavigation={true}
                />
            </div>
        </div>
    );
}

export default MyCalendar;