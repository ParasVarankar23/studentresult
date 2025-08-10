import React, { useState } from 'react';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Settings.css';

const Setting1 = () => {
    const [hospitalName, setHospitalName] = useState('S.N.K.Jr College');
    const [adminEmail, setAdminEmail] = useState('parasvarankar@skcollege.com');
    const [password, setPassword] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleSaveChanges = () => {
        console.log('Settings saved:', { hospitalName, adminEmail, password });
        
        setIsSuccess(true);
        setModalContent('Password changed successfully!');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="settings-page">
            <Link to='/StudentSidebar'>
                <FaArrowLeft className="back-arrow-settings" />
            </Link>
            <h2>Student Settings</h2>
            <div className="form-group">
                <label htmlFor="hospitalName">College Name</label>
                <input
                    type="text"
                    id="hospitalName"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="adminEmail">Student Email</label>
                <input
                    type="email"
                    id="adminEmail"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Change Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleSaveChanges}>Save Changes</button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        {isSuccess ? (
                            <FaCheckCircle className="success-icon" />
                        ) : (
                            <FaTimesCircle className="error-icon" />
                        )}
                        <p>{modalContent}</p>
                        <button className="ok-button-main" onClick={closeModal}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Setting1;
