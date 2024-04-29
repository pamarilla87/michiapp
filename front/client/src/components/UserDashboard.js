import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Corrected import
import './UserDashboard.css'

function UserDashboard() {
    const [username, setUsername] = useState('');
    const [pendingCount, setPendingCount] = useState(0);
    const navigate = useNavigate();

    const fetchPendingCount = useCallback(async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/form/status-count?estado=0`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.ok) {
            const { count } = await response.json();
            setPendingCount(count);
        } else {
            throw new Error('Failed to fetch pending count');
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token available');
            navigate('/admin-login');
            return;
        }

        try {
            const decoded = jwtDecode(token);
            setUsername(decoded.username);
            fetchPendingCount();
        } catch (error) {
            console.error('Invalid token:', error);
            localStorage.removeItem('token');
            navigate('/admin-login');
        }
    }, [navigate, fetchPendingCount]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin-login');
    };

    const handleViewPending = () => {
        navigate('/pending-forms');
    };

    const handleRefreshPending = () => {
        fetchPendingCount();
    };

    const handleViewCalendar = () => {
        navigate('/my-calendar'); // Assumes you have a route named '/my-calendar'
    };

    const handleViewProfile = () => {
        navigate('/my-profile'); // Assumes you have a route named '/my-calendar'
    };

    return (
        <div className="success-container">
            <div className="success-card">
                <h1 className="success-title">Logged in successfully</h1>
                <p className="success-text">Welcome to the dashboard, {username || 'User'}!</p>
                <button className="success-button" onClick={handleViewPending}>
                    Solicitudes pendientes ({pendingCount})
                </button>
                <button className="success-button" onClick={handleRefreshPending}>Refrescar Solicitudes</button>
                <button className="success-button" onClick={handleViewCalendar}>Mi Calendario</button>
                <button className="success-button" onClick={handleViewProfile}>Mi Perfil</button>
                <button className="success-button" onClick={handleLogout}>Salir</button>
            </div>
        </div>
    );
}

export default UserDashboard;
