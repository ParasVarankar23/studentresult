import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './AddStudentPage.css';

const EditStudentPage = () => {
const { id } = useParams();
const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    enrollmentDate: '',
    status: '',
    course: '',
    semester: ''
});
const [message, setMessage] = useState('');
const navigate = useNavigate();

useEffect(() => {
    fetch(`http://localhost:8081/college/${id}`)
    .then(res => res.json())
    .then(data => setFormData(data))
    .catch(err => console.error('Error fetching student data:', err));
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
    fetch(`http://localhost:8081/college/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        setMessage('Student Updated Successfully!');
        setTimeout(() => {
        navigate('/ManageStudentPage');
        }, 2000);
    })
    .catch(error => console.error('Error updating student:', error));
};

return (
    <div className="studentpage-container">
    <Link to='/ManageStudentPage' aria-label="Back to Student List">
        <FaArrowLeft className="studentpage-back-arrow" />
    </Link>
    <div className="studentpage">
        <h1>Edit Student</h1>
        {message && <div className="success-message">{message}</div>}
        <form className="studentpage-form" onSubmit={handleSubmit}>
        <div className="studentpage-form-row">
            <div className="studentpage-form-group">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="studentpage-form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
        </div>
        <div className="studentpage-form-row">
            <div className="studentpage-form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="studentpage-form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
        </div>
        <div className="studentpage-form-row">
            <div className="studentpage-form-group">
            <label htmlFor="enrollmentDate">Enrollment Date:</label>
            <input type="date" id="enrollmentDate" name="enrollmentDate" value={formData.enrollmentDate} onChange={handleChange} required />
            </div>
            <div className="studentpage-form-group">
            <label htmlFor="status">Status:</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} required>
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
            </div>
        </div>
        <div className="studentpage-form-row">
            <div className="studentpage-form-group">
            <label htmlFor="course">Courses:</label>
            <select id="course" name="course" value={formData.course} onChange={handleChange} required>
                <option value="">Select Course</option>
                <option value="BSc IT">BSc IT</option>
                <option value="BSc CS">BSc CS</option>
                <option value="BCA">BCA</option>
            </select>
            </div>
            <div className="studentpage-form-group">
            <label htmlFor="semester">Semesters:</label>
            <select id="semester" name="semester" value={formData.semester} onChange={handleChange} required>
                <option value="">Select Semester</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
                <option value="VI">VI</option>
            </select>
            </div>
        </div>
        <div className="studentpage-form-row">
            <div className="studentpage-form-group">
            <button type="submit">Update Student</button>
            </div>
        </div>
        </form>
    </div>
    </div>
);
};

export default EditStudentPage;
