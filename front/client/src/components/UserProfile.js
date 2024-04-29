import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;
        axios.get(`${process.env.REACT_APP_API_URL}/auth/view-profile`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            setProfile(response.data || {});
        }).catch(error => {
            console.error('Failed to fetch profile:', error);
        });
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.post(`${process.env.REACT_APP_API_URL}/auth/update-profile`, profile, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            alert('Profile updated successfully!');
        }).catch(error => {
            alert('Failed to update profile');
            console.error('Error updating profile:', error);
        });
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="form-container"> {/* Wrapper container */}
            <form onSubmit={handleSubmit} className="user-profile-form">
                <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} placeholder="First Name" />
                <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} placeholder="Last Name" />
                <input type="text" name="address" value={profile.address} onChange={handleChange} placeholder="Address" />
                <input type="text" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
                <div className="user-profile-button-group">
                    <button type="button" onClick={goBack} className="user-profile-volver-button">Volver</button>
                    <button type="submit">Guardar</button>
                </div>
            </form>
        </div>
    );
}

export default UserProfile;
