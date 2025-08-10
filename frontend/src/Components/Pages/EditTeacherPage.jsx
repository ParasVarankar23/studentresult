import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './EditTeacherPage.css';

const EditTeacherPage = () => {
const { id } = useParams();
const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    department: '',
    hiring_date: '',
    status: '',
    qualification: '',
    experience: ''
});
const [isModalOpen, setIsModalOpen] = useState(false);
const [modalContent, setModalContent] = useState('');
const [isSuccess, setIsSuccess] = useState(false);
const navigate = useNavigate();

useEffect(() => {
    fetch(`http://localhost:8081/teachermanagement/${id}`)
    .then((response) => {
        if (!response.ok) {
        throw new Error('Failed to fetch teacher data');
        }
        return response.json();
    })
    .then((data) => setFormData(data))
    .catch((error) => {
        console.error('Error fetching teacher:', error);
        setModalContent('Failed to load teacher data.');
        setIsSuccess(false);
        setIsModalOpen(true);
    });
}, [id]);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
    ...prevState,
    [name]: value
    }));
};

const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch(`http://localhost:8081/teachermanagement/${id}`, {
    method: 'PUT',
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
        setModalContent(data.message || 'Teacher updated successfully.');
        setIsSuccess(true);
        setIsModalOpen(true);
        setTimeout(() => {
        navigate('/ManageTeacherPage');
        }, 2000);
    })
    .catch(error => {
        console.error('Error updating teacher:', error);
        setModalContent('Error updating teacher.');
        setIsSuccess(false);
        setIsModalOpen(true);
    });
};

const closeModal = () => {
    setIsModalOpen(false);
};

return (
    <div className="teacherpage-container">
    <Link to="/ManageTeacherPage" aria-label="Back to Teacher List" className="teacherpage-back-arrow">
        <FaArrowLeft />
    </Link>
    <div className="teacherpage-header">
        <h1 className="teacherpage-title">Edit Teacher</h1>
    </div>
    <form className="teacherpage-form" onSubmit={handleSubmit}>
        <div className="teacherpage-form-row">
        <div className="teacherpage-form-group">
            <label className="teacherpage-form-label" htmlFor="first_name">First Name:</label>
            <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="teacherpage-form-input"
            required
            />
        </div>
        <div className="teacherpage-form-group">
            <label className="teacherpage-form-label" htmlFor="last_name">Last Name:</label>
            <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="teacherpage-form-input"
            required
            />
        </div>
        </div>
        <div className="teacherpage-form-row">
        <div className="teacherpage-form-group">
            <label className="teacherpage-form-label" htmlFor="email">Email:</label>
            <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="teacherpage-form-input"
            required
            />
        </div>
        <div className="teacherpage-form-group">
            <label className="teacherpage-form-label" htmlFor="phone">Phone Number:</label>
            <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="teacherpage-form-input"
            required
            />
        </div>
        </div>
        <div className="teacherpage-form-row">
        <div className="teacherpage-form-group">
            <label className="teacherpage-form-label" htmlFor="department">Department:</label>
            <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="teacherpage-form-input"
            required
            />
        </div>
        <div className="teacherpage-form-group">
            <label className="teacherpage-form-label" htmlFor="hiring_date">Hiring Date:</label>
            <input
            type="date"
            id="hiring_date"
            name="hiring_date"
            value={formData.hiring_date}
            onChange={handleChange}
            className="teacherpage-form-input"
            required
            />
        </div>
        </div>
        <div className="teacherpage-form-row">
        <div className="teacherpage-form-group">
            <label className="teacherpage-form-label" htmlFor="status">Status:</label>
            <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="teacherpage-form-select"
            required
            >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            </select>
        </div>
        <div className="teacherpage-form-group">
            <label className="teacherpage-form-label" htmlFor="qualification">Qualification:</label>
            <input
            type="text"
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="teacherpage-form-input"
            required
            />
        </div>
        </div>
        <div className="teacherpage-form-row">
        <div className="teacherpage-form-group">
            <label className="teacherpage-form-label" htmlFor="experience">Experience:</label>
            <input
            type="text"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="teacherpage-form-input"
            required
            />
        </div>
        </div>
        <div className="teacherpage-form-row">
        <div className="teacherpage-form-group">
            <button type="submit">Update Teacher</button>
        </div>
        </div>
    </form>
    {isModalOpen && (
        <div className="modal">
        <div className="modal-content">
            {isSuccess ? (
            <FaCheckCircle className="success-icon" />
            ) : (
            <FaTimesCircle className="error-icon" />
            )}
            <p>{modalContent}</p>
            <button className="modal-close-button" onClick={closeModal}>OK</button>
        </div>
        </div>
    )}
    </div>
);
};

export default EditTeacherPage;
