import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="widgets">
        <div className="widget">
          <h2>Class Schedule</h2>
          <p>View and manage class schedules.</p>
        </div>
        <div className="widget">
          <h2>Exam Schedule</h2>
          <p>View and manage exam schedules.</p>
        </div>
        <div className="widget">
          <h2>Student Results</h2>
          <p>View and manage student results.</p>
        </div>
        <div className="widget">
          <h2>Profile</h2>
          <p>View and manage your profile.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
