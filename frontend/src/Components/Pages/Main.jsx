import axios from 'axios'; // Import axios to make API requests
import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import ResultImage from '../../Assets/result.jpg';
import './Main.css';

const Main = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call backend login API
            const response = await axios.post('http://localhost:8081/login', {
                email,
                password,
            });

            if (response.data.message === 'Login successful') {
                setModalContent('Login Successfully!');
                setIsModalOpen(true);

                // Delay navigation for 1 second
                setTimeout(() => {
                    const role = response.data.user.role; // Assuming role is returned from backend

                    if (role === 'Admin') {
                        navigate('/AdminSidebar');
                    } else if (role === 'Teacher') {
                        navigate('/TeacherSidebar');
                    } else if (role === 'Student') {
                        navigate('/StudentSidebar');
                    }
                }, 1000);
            }
        } catch (err) {
            setModalContent('Invalid email or password.');
            setIsModalOpen(true);
            console.log(err);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEmail('');
        setPassword('');
    };

    return (
        <div className="main-container">
            <div className="main-content">
                <div className="image-container">
                    <img src={ResultImage} alt="Results" />
                    <h3>Welcome to the Online Evaluation of Academic Performance!</h3>
                    <p>Our platform is designed to revolutionize the way academic performance is assessed and analyzed. With a user-friendly interface and advanced features, we provide students, educators, and institutions with a comprehensive online solution for evaluating and tracking academic progress.</p>
                </div>
                <div className="login-form">
                    <div className="profile-icon-container">
                        <FaUserCircle className="profile-icon" />
                    </div>
                    <h2>Login</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Enter your email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <label htmlFor='Password'>Enter your password</label>
                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button-main">Login</button>
                        <p className="message">Don't have an account? <Link to="/signup">Signup</Link></p>
                        <p className="message">Please contact your credential provider.</p>
                    </form>
                    <p>All rights reserved Copyrights Twinkle IT Solutions Pvt. Ltd. @2024</p>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        {modalContent.includes('Successfully') ? (
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

export default Main;
