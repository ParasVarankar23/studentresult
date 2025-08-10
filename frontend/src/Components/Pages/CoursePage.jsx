import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './CoursePage.css';

const CoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState({
    name: '',
    code: '',
    description: '',
    credits: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8081/courses/${id}`)
        .then(response => setCourse(response.data))
        .catch(error => console.error('Error fetching course data:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id
      ? axios.put(`http://localhost:8081/courses/${id}`, course)
      : axios.post('http://localhost:8081/courses', course);

    request
      .then(() => {
        alert('Course added successfully!');
        navigate('/CourseListPage');
      })
      .catch(error => console.error('Error submitting course:', error));
  };

  return (
    <div className="course-page-container">
      <div className="course-page-header">
        <Link to="/CourseListPage" className="course-page-back-arrow">
          <FaArrowLeft />
        </Link>
        <h1>Course Details</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Course Name:</label>
          <input id="name" type="text" value={course.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="code">Course Code:</label>
          <input id="code" type="text" value={course.code} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={course.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="credits">Credit Points:</label>
          <input id="credits" type="number" value={course.credits} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CoursePage;
