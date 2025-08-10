import axios from 'axios';
import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import ResultImage from '../../Assets/result1.jpg';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    try {
      const response = await axios.post('http://localhost:8081/signup', { email, password });

      if (response.status === 200) {
        setModalContent('Signup Successful!');
        setIsModalOpen(true);
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (err) {
      setModalContent('Failed to signup. Please try again.');
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="signup-container">
      <div className="signup-image-container">
        <img src={ResultImage} alt="Results" />
        <h1>Welcome to the Online Evaluation of Academic Performance!</h1>
        <p>
          Our platform provides students, educators, and institutions with a solution for tracking academic progress.
        </p>
      </div>

      <div className="signup-form">
        <div className="profile-icon-container">
          <FaUserCircle className="profile-icon" />
        </div>

        <h2>PCACS Signup</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Enter your Email Id</label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password"><b>Enter your Password</b></label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="confirmPassword">Enter your Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="blue-button">Signup</button>

          <Link to='/'>
            <button type="button" className="green-button">Login</button>
          </Link>

          <p>Already have an account? <Link to='/'>Login</Link></p>
        </form>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {modalContent.includes('Successful') ? (
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

export default Signup;
