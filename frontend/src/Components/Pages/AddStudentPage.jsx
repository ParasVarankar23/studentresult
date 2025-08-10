import React, { useState } from 'react';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './AddStudentPage.css';

const AddStudentPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    course: '',
    semester: '',
    email: '',
    phone: '',
    enrollment_date: '',
    status: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.first_name || !formData.last_name || !formData.enrollment_date) {
      setModalContent('Please fill out all required fields.');
      setIsSuccess(false);
      setIsModalOpen(true);
      return;
    }

  
    fetch('http://localhost:8081/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setModalContent(data.message || 'Student added successfully.');
      setIsSuccess(true);
      setIsModalOpen(true);
      setFormData({
        first_name: '',
        last_name: '',
        course: '',
        semester: '',
        email: '',
        phone: '',
        enrollment_date: '',
        status: ''
      });
      setTimeout(() => {
        navigate('/ManageStudentPage');
      }, 2000);
    })
    .catch(error => {
      console.error('Error adding student:', error);
      setModalContent('Error adding student.');
      setIsSuccess(false);
      setIsModalOpen(true);
    });
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="studentpage-container">
      <Link to='/ManageStudentPage' aria-label="Back to Student List">
        <FaArrowLeft className="studentpage-back-arrow" />
      </Link>
      <div className="studentpage">
        <h1>Add Student</h1>
        <form className="studentpage-form" onSubmit={handleSubmit}>
          <div className="studentpage-form-row">
            <div className="studentpage-form-group">
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="studentpage-form-group">
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="studentpage-form-row">
            <div className="studentpage-form-group">
              <label htmlFor="course">Course:</label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option value="">Select Course</option>
                <option value="BSc IT">BSc IT</option>
                <option value="BSc CS">BSc CS</option>
                <option value="BCA">BCA</option>
              </select>
            </div>
            <div className="studentpage-form-group">
              <label htmlFor="semester">Semester:</label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
              >
                <option value="">Select Semester</option>
                <option value="I">1</option>
                <option value="II">2</option>
                <option value="III">3</option>
                <option value="IV">4</option>
                <option value="V">5</option>
                <option value="VI">6</option>
              </select>
            </div>
          </div>
          <div className="studentpage-form-row">
            <div className="studentpage-form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="studentpage-form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="studentpage-form-row">
            <div className="studentpage-form-group">
              <label htmlFor="enrollment_date">Enrollment Date:</label>
              <input
                type="date"
                id="enrollment_date"
                name="enrollment_date"
                value={formData.enrollment_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="studentpage-form-group">
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="studentpage-form-row">
            <div className="studentpage-form-group">
              <button type="submit">Add Student</button>
            </div>
          </div>
        </form>
      </div>
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

export default AddStudentPage;
