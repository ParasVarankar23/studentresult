import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ListMarks.css';

const ListMarks = () => {
const [marks, setMarks] = useState([]);

useEffect(() => {
    const fetchMarks = async () => {
    try {
        const response = await axios.get('http://localhost:8081/marks');
        setMarks(response.data);
    } catch (error) {
        console.error('Error fetching marks:', error);
    }
    };

    fetchMarks();
}, []);

const handleDelete = async (id) => {
    try {
    await axios.delete(`http://localhost:8081/delete-marks/${id}`);
    setMarks(marks.filter(mark => mark.id !== id));
    } catch (error) {
    console.error('Error deleting marks:', error);
    }
};

return (
    <div className="list-marks-container">
    <h2>Marks List</h2>
    <Link to="/AddMarks" className="add-link">Add New Marks</Link>
    <table className="marks-table">
        <thead>
        <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>Roll Number</th>
            <th>Course</th>
            <th>Class</th>
            <th>Subject Code</th>
            <th>Subject</th>
            <th>Theory Marks</th>
            <th>Internal Marks</th>
            <th>Total Marks</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {marks.map(mark => (
            <tr key={mark.id}>
            <td>{mark.id}</td>
            <td>{mark.studentName}</td>
            <td>{mark.rollNo}</td>
            <td>{mark.course}</td>
            <td>{mark.class}</td>
            <td>{mark.subjectCode}</td>
            <td>{mark.subject}</td>
            <td>{mark.theory}</td>
            <td>{mark.internal}</td>
            <td>{mark.total}</td>
            <td>
                <Link to={`/update-marks/${mark.id}`} className="edit-link">Edit</Link>
                <button onClick={() => handleDelete(mark.id)} className="delete-button">Delete</button>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
);
};

export default ListMarks;
