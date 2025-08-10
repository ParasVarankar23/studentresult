import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './AddTeacherPage.css';

const AddTeacherPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    department: '',
    hiring_date: '',
    status: '',
    qualification: '',
    experience: '',
  });

  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8081/teachermanagement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error adding teacher');
        }
        return response.json();
      })
      .then((data) => {
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error('Error adding teacher:', error);
        setError(error.message);
        alert('Failed to add teacher.');
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/ManageTeacherPage');
  };

  return (
    <div className="teacherpage-container">
      <div className="teacherpage-header">
        <Link to="/ManageTeacherPage" className="teacherpage-back-arrow">
          <FaArrowLeft />
        </Link>
        <h1 className="teacherpage-title">Add New Teacher</h1>
      </div>

      {error && <p className="error-message">{error}</p>}

      <form className="teacherpage-form" onSubmit={handleSubmit}>
        <div className="teacherpage-form-row">
          <div className="teacherpage-form-group">
            <label htmlFor="first_name" className="teacherpage-form-label">First Name</label>
            <input
              type="text"
              id="first_name"
              className="teacherpage-form-input"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="teacherpage-form-group">
            <label htmlFor="last_name" className="teacherpage-form-label">Last Name</label>
            <input
              type="text"
              id="last_name"
              className="teacherpage-form-input"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="teacherpage-form-row">
          <div className="teacherpage-form-group">
            <label htmlFor="email" className="teacherpage-form-label">Email</label>
            <input
              type="email"
              id="email"
              className="teacherpage-form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="teacherpage-form-group">
            <label htmlFor="phone" className="teacherpage-form-label">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="teacherpage-form-input"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="teacherpage-form-row">
          <div className="teacherpage-form-group">
            <label htmlFor="department" className="teacherpage-form-label">Department</label>
            <select
              id="department"
              className="teacherpage-form-select"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="BSc IT">BSc IT</option>
              <option value="BCA">BCA</option>
              <option value="BSc CS">BSc CS</option>
            </select>
          </div>
          <div className="teacherpage-form-group">
            <label htmlFor="hiring_date" className="teacherpage-form-label">Hiring Date</label>
            <input
              type="date"
              id="hiring_date"
              className="teacherpage-form-input"
              value={formData.hiring_date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="teacherpage-form-row">
          <div className="teacherpage-form-group">
            <label htmlFor="status" className="teacherpage-form-label">Status</label>
            <input
              type="text"
              id="status"
              className="teacherpage-form-input"
              value={formData.status}
              onChange={handleChange}
              required
            />
          </div>
          <div className="teacherpage-form-group">
            <label htmlFor="qualification" className="teacherpage-form-label">Qualification</label>
            <input
              type="text"
              id="qualification"
              className="teacherpage-form-input"
              value={formData.qualification}
              onChange={handleChange}
              required
            />
          </div>
          <div className="teacherpage-form-group">
            <label htmlFor="experience" className="teacherpage-form-label">Experience (years)</label>
            <input
              type="number"
              id="experience"
              className="teacherpage-form-input"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="teacherpage-submit-button">
          Submit
        </button>
      </form>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Teacher Added Successfully!</h2>
            <button onClick={closeModal} className="modal-close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTeacherPage;
