import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './AddAttendance.css';

const AddAttendance = () => {
  const [formData, setFormData] = useState({
    id: '',
    studentName: '',
    rollNo: '',
    course: '',
    class: '',
    subjectCode: '',
    subject: '',
    date: '',
    status: '',
  });
  const [students, setStudents] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStudent = { ...formData, id: uuidv4() };
    try {
      
      await fetch('http://localhost:8081/add-attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });
      setStudents([...students, newStudent]);
      setFormData({
        id: '',
        studentName: '',
        rollNo: '',
        course: '',
        class: '',
        subjectCode: '',
        subject: '',
        date: '',
        status: '',
      });
      setModalMessage('Attendance added successfully!');
      setShowModal(true);
    } catch (error) {
      console.error('Error adding attendance:', error);
      setModalMessage('Error adding attendance. Please try again.');
      setShowModal(true);
    }
  };

  const handleShowStudents = () => {
    setShowStudents(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="add-attendance-container">
      <Link to='/TeacherSidebar' aria-label="Back to Teacher Sidebar">
        <FaArrowLeft className="studentpage-back-arrow" />
      </Link>
      <h1 className="title">Add Attendance</h1>
      <form className="add-attendance-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            placeholder="Student Name"
            className="form-input"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Roll No"
            className="form-input"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <select
            className="form-select"
            name="course"
            value={formData.course}
            onChange={handleChange}
          >
            <option value="">Course</option>
            <option value="BSc IT">BSc IT</option>
            <option value="BSc CS">BSc CS</option>
            <option value="BCA">BCA</option>
          </select>
          <select
            className="form-select"
            name="class"
            value={formData.class}
            onChange={handleChange}
          >
            <option value="">Class</option>
            <option value="FYIT">FYIT</option>
            <option value="SYIT">SYIT</option>
            <option value="TYIT">TYIT</option>
            <option value="FYCS">FYCS</option>
            <option value="SYCS">SYCS</option>
            <option value="TYCS">TYCS</option>
            <option value="FYBCA">FYBCA</option>
            <option value="SYBCA">SYBCA</option>
            <option value="TYBCA">TYBCA</option>
          </select>
        </div>
        <div className="form-row">
          <input
            type="text"
            placeholder="Subject Code"
            className="form-input"
            name="subjectCode"
            value={formData.subjectCode}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Subject"
            className="form-input"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <input
            type="date"
            className="form-input"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          <select
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
          </select>
        </div>

        <div className="submit-show-buttons">
          <button type="submit" className="submit-button">Submit</button>
          <button type="button" className="show-attendance-button" onClick={handleShowStudents}>Show Attendance</button>
        </div>
      </form>

      {showStudents && (
        <div className="students-table-container">
          {students.length > 0 && (
            <table className="students-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Roll No</th>
                  <th>Course</th>
                  <th>Class</th>
                  <th>Subject Code</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.studentName}</td>
                    <td>{student.rollNo}</td>
                    <td>{student.course}</td>
                    <td>{student.class}</td>
                    <td>{student.subjectCode}</td>
                    <td>{student.subject}</td>
                    <td>{student.date}</td>
                    <td>{student.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddAttendance;
