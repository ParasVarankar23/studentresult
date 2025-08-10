import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddMarks.css';

const AddMarks = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    rollNo: '',
    course: '',
    class: '',
    subjectCode: '',
    subject: '',
    theory: '',
    internal: '',
    total: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/marks', formData);
      navigate('/ListMarks');
    } catch (error) {
      console.error('Error adding marks:', error);
    }
  };

  return (
    <div className="add-marks-container">
      <h2>Add Marks</h2>
      <form onSubmit={handleSubmit} className="add-marks-form">
        <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} placeholder="Student Name" required />
        <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} placeholder="Roll Number" required />
        <input type="text" name="course" value={formData.course} onChange={handleChange} placeholder="Course" required />
        <input type="text" name="class" value={formData.class} onChange={handleChange} placeholder="Class" required />
        <input type="text" name="subjectCode" value={formData.subjectCode} onChange={handleChange} placeholder="Subject Code" required />
        <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required />
        <input type="number" name="theory" value={formData.theory} onChange={handleChange} placeholder="Theory Marks" required />
        <input type="number" name="internal" value={formData.internal} onChange={handleChange} placeholder="Internal Marks" required />
        <input type="number" name="total" value={formData.total} onChange={handleChange} placeholder="Total Marks" required />
        <button type="submit">Add Marks</button>
      </form>
    </div>
  );
};

export default AddMarks;
