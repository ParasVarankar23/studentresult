import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaEdit, FaTrash,FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ManageStudentReport.css';

const ManageReportPage = () => {
const [reports, setReports] = useState([]);
const [error, setError] = useState(null);

useEffect(() => {
    fetch('http://localhost:8081/results')
    .then((response) => {
        if (!response.ok) {
        throw new Error('Failed to fetch reports');
        }
        return response.json();
    })
    .then((data) => setReports(data))
    .catch((error) => {
        console.error('Error fetching reports:', error);
        setError(error.message);
    });
}, []);

const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
    fetch(`http://localhost:8081/results/${id}`, {
        method: 'DELETE',
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error('Error deleting report');
        }
        setReports(reports.filter((report) => report.id !== id));
        alert('Report deleted successfully!');
        })
        .catch((error) => {
        console.error('Error deleting report:', error);
        alert('Failed to delete report.');
        });
    }
};

return (
    <div className="manage-reports">
    <Link to="/AdminSidebar" className="back-button">
        <FaArrowLeft />
    </Link>
    <div className="header">
        <h1>Manage Reports</h1>
        <Link to="/StudentReport" className="add-button">
        <FaPlus /> Add New Report
        </Link>
    </div>

    {error && <p className="error-message">{error}</p>}

    <table className="reports-table">
        <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Seat Number</th>
            <th>Status</th>
            <th>CGPA/SGPA</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {reports.map((report) => (
            <tr key={report.id}>
            <td>{report.id}</td>
            <td>{report.name}</td>
            <td>{report.seat_number}</td>
            <td>{report.status}</td>
            <td>{report.cgpa_sgpa}</td>
            <td>
                <Link to={`/EditReport/${report.id}`} className="action-button">
                <FaEdit />
                </Link>
                <button
                onClick={() => handleDelete(report.id)}
                className="action-button"
                >
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

export default ManageReportPage;
