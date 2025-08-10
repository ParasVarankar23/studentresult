import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import { FaChartBar, FaCog, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const StudentSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-container">
        <button
          className="sidebar-link"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          onKeyDown={(e) => e.key === 'Enter' && toggleSidebar()}
        >
          <MenuIcon className='menu-icon' />
        </button>
        <Link to="/Profile" className="sidebar-link">
          <FaUser className="sidebar-icon" />
          {!isCollapsed && <span>Profile</span>}
        </Link>
        <Link to="/StudentAttendance" className="sidebar-link">
          <FaChartBar className="sidebar-icon" />
          {!isCollapsed && <span>Attendance</span>}
        </Link>
        <Link to="/Result" className="sidebar-link">
          <FaChartBar className="sidebar-icon" />
          {!isCollapsed && <span>Result</span>}
        </Link>
        <Link to="/StudentSetting" className="sidebar-link">
          <FaCog className="sidebar-icon" />
          {!isCollapsed && <span>Settings</span>}
        </Link>
        <Link to="/" className="sidebar-link">
          <FaSignOutAlt className="sidebar-icon" />
          {!isCollapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
};

export default StudentSidebar;
