import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaCheckCircle, FaEdit, FaPlus, FaTimesCircle, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ManageTeacherPage.css';

const ManageTeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isSuccess, setIsSuccess] = useState(false); // Success/Error tracking
  const [modalContent, setModalContent] = useState(''); // Modal message

  useEffect(() => {
    fetch('http://localhost:8081/teachermanagement')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch teachers');
        }
        return response.json();
      })
      .then((data) => setTeachers(data))
      .catch((error) => {
        console.error('Error fetching teachers:', error);
        setError(error.message);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      fetch(`http://localhost:8081/teachermanagement/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error deleting teacher');
          }
          setTeachers(teachers.filter((teacher) => teacher.id !== id));
          setIsSuccess(true); // Set success state
          setModalContent('Teacher deleted successfully!');
          setIsModalOpen(true); // Open modal
        })
        .catch((error) => {
          console.error('Error deleting teacher:', error);
          setIsSuccess(false); // Set failure state
          setModalContent('Failed to delete teacher.');
          setIsModalOpen(true); // Open modal
        });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="manage-teachers">
      <Link to="/AdminSidebar" className="back-button">
        <FaArrowLeft />
      </Link>
      <div className="header">
        <h1>Manage Teachers</h1>
        <Link to="/AddTeacher" className="add-button">
          <FaPlus /> Add New Teacher
        </Link>
      </div>

      {error && <p className="error-message">{error}</p>}

      <table className="teachers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Department</th>
            <th>Hiring Date</th>
            <th>Status</th>
            <th>Qualification</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.id}</td>
              <td>{teacher.first_name}</td>
              <td>{teacher.last_name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.phone}</td>
              <td>{teacher.department}</td>
              <td>{teacher.hiring_date}</td>
              <td>{teacher.status}</td>
              <td>{teacher.qualification}</td>
              <td>{teacher.experience}</td>
              <td>
                <Link to={`/EditTeacher/${teacher.id}`} className="action-button">
                  <FaEdit />
                </Link>
                <button
                  onClick={() => handleDelete(teacher.id)}
                  className="action-button"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for success/failure messages */}
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

export default ManageTeachersPage;
