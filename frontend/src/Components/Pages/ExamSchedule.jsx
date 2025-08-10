import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ExamSchedule.css';

const ExamSchedule = () => {
  const [examSchedules, setExamSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    exam_name: '',
    date: '',
    time: '',
    duration: '',
    subject: '',
    location: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8081/exam_management')
      .then(response => setExamSchedules(response.data))
      .catch(error => console.error('Error fetching exam schedules:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule({
      ...newSchedule,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/exam_management', newSchedule)
      .then(response => {
        setExamSchedules([...examSchedules, { ...newSchedule, id: response.data.id }]);
        setNewSchedule({ exam_name: '', date: '', time: '', duration: '', subject: '', location: '' });
      })
      .catch(error => console.error('Error adding exam schedule:', error));
  };

  return (
    <div className="page-container">
      <Link to="/AdminSidebar" className="back-arrow">
        <FaArrowLeft size={24} />
      </Link>

      <h1>Exam Schedule</h1>
      <form onSubmit={handleSubmit} className="schedule-form">
        <div className="form-group">
          <label htmlFor="examName">Exam Name</label>
          <input
            type="text"
            id="exam_name"
            name="examName"
            value={newSchedule.exam_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={newSchedule.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={newSchedule.time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={newSchedule.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={newSchedule.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={newSchedule.location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Schedule</button>
      </form>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Exam Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Duration</th>
            <th>Subject</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {examSchedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.exam_name}</td>
              <td>{schedule.date}</td>
              <td>{schedule.time}</td>
              <td>{schedule.duration}</td>
              <td>{schedule.subject}</td>
              <td>{schedule.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamSchedule;
