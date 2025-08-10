import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ManageStudentPage.css'; // Ensure you have CSS for styling

const ManageStudentsPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch('http://localhost:8081/students')
      .then(response => response.json())
      .then(data => setStudents(Array.isArray(data) ? data : []))
      .catch(error => console.error('Error fetching students:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8081/students/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchStudents(); // Refresh the list after deletion
        alert('Student deleted successfully!');
      })
      .catch(error => console.error('Error deleting student:', error));
  };

  return (
    <div className="manage-students">
      <Link to="/AdminSidebar" className="back-button">
        <FaArrowLeft />
      </Link>
      <div className="header">
        <h1>Manage Students</h1>
        <Link to="/AddStudent" className="add-button">
          <FaPlus /> Add New Student
        </Link>
      </div>
      <table className="students-tables">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Course</th>
            <th>Semester</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Enrollment Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.student_id}>
              <td>{student.id}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.course}</td>
              <td>{student.semester}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.enrollment_date}</td>
              <td>{student.status}</td>
              <td>
                <Link to={`/EditStudent/${student.id}`} className="action-button">
                  <FaEdit />
                </Link>
                <button onClick={() => handleDelete(student.student_id)} className="action-button">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStudentsPage;
