import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ClassSchedule.css';

const ClassSchedule = () => {
  const [classSchedules, setClassSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    class_name: '',
    day: '',
    time: '',
    teacher: ''
  });

  useEffect(() => {
    fetchClassSchedules();
  }, []);

  const fetchClassSchedules = async () => {
    try {
      const response = await fetch('http://localhost:8081/class_management');
      const data = await response.json();
      setClassSchedules(data);
    } catch (error) {
      console.error('Error fetching class schedules:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule({
      ...newSchedule,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/class_management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSchedule)
      });
      if (response.ok) {
        fetchClassSchedules();
        setNewSchedule({ class_name: '', day: '', time: '', teacher: '' });
      } else {
        console.error('Failed to add schedule');
      }
    } catch (error) {
      console.error('Error adding schedule:', error);
    }
  };

  return (
    <div className="page-container">
      <Link to="/AdminSidebar" className="back-arrow">
        <FaArrowLeft size={24} />
      </Link>
      <h1>Class Schedule</h1>
      <form onSubmit={handleSubmit} className="schedule-form">
        <div className="form-group">
          <label htmlFor="class_name">Class Name</label>
          <select
            id="class_name"
            name="class_name"
            value={newSchedule.class_name}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Class</option>
            <option value="FYIT">FYIT</option>
            <option value="SYIT">SYIT</option>
            <option value="TYIT">TYIT</option>
            <option value="FYBCA">FYBCA</option>
            <option value="SYBCA">SYBCA</option>
            <option value="TYBCA">TYBCA</option>
            <option value="FYCS">FYCS</option>
            <option value="SYCS">SYCS</option>
            <option value="TYCS">TYCS</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="day">Day</label>
          <input
            type="date"
            id="day"
            name="day"
            value={newSchedule.day}
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
          <label htmlFor="teacher">Teacher</label>
          <select
            id="teacher"
            name="teacher"
            value={newSchedule.teacher}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Teacher</option>
            <option value="Mrs. Anju">Mrs. Anju</option>
            <option value="Mrs. Nikita">Mrs. Nikita</option>
            <option value="Mrs. Dhanya">Mrs. Dhanya</option>
            <option value="Mrs. Sanjana">Mrs. Sanjana</option>
            <option value="Mr. Omkar">Mr. Omkar</option>
            <option value="Mrs. Jagruti">Mrs. Jagruti</option>
            <option value="Mr. Ishmeet">Mr. Ishmeet</option>
            <option value="Mrs. Kanchan">Mrs. Kanchan</option>
            <option value="Mrs. Solyi">Mrs. Solyi</option>
            <option value="Mrs. Kumudini">Mrs. Kumudini</option>
            <option value="Mrs. Shubhangi">Mrs. Shubhangi</option>
          </select>
        </div>
        <button type="submit">Add Schedule</button>
      </form>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Day</th>
            <th>Time</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tbody>
          {classSchedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.class_name}</td>
              <td>{schedule.day}</td>
              <td>{schedule.time}</td>
              <td>{schedule.teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassSchedule;
