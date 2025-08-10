import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './CourseListPage.css';

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses data from API
    axios.get('http://localhost:8081/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/courses/${id}`)
      .then(() => {
        setCourses(courses.filter(course => course.id !== id));
      })
      .catch(error => console.error('Error deleting course:', error));
  };

  return (
    <div className="course-list-page">
      <Link to="/AdminSidebar" className="course-page-back-arrow">
        <FaArrowLeft />
      </Link>
      <div className="header">
        <h1>Course List</h1>
        <Link to="/CoursePage" className="add-button">
          <FaPlus /> Add New Course
        </Link>
      </div>
      <table className="courses-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Description</th>
            <th>Credits</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.code}</td>
              <td>{course.description}</td>
              <td>{course.credits}</td>
              <td>
                <Link to={`/CoursePage/${course.id}`} className="action-button">
                  <FaEdit />
                </Link>
                <button onClick={() => handleDelete(course.id)} className="action-button">
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

export default CourseListPage;
