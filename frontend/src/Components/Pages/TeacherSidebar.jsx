import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { FaChevronUp, FaChevronDown, FaTachometerAlt, FaUsers, FaBook, FaCog, FaSignOutAlt } from 'react-icons/fa';

import './TeacherSidebar.css';

const TeacherSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);
  const [studentsOpen, setStudentsOpen] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleCourse = () => setCourseOpen(!courseOpen);
  const toggleStudents = () => setStudentsOpen(!studentsOpen);

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-container">
        <button className="sidebar-link" onClick={toggleSidebar}>
          <MenuIcon className='menu-icon' />
        </button>
        <Link to="/TeacherProfile" className="sidebar-link">
          <FaTachometerAlt className="sidebar-icon" />
          {!isCollapsed && <span>Profile</span>}
        </Link>
        <button className="sidebar-link" onClick={toggleCourse}>
          <FaBook className="sidebar-icon" />
          {!isCollapsed && <span>Courses</span>}
          {!isCollapsed && (courseOpen ? <FaChevronUp className="sidebar-icon" /> : <FaChevronDown className="sidebar-icon" />)}
        </button>
        {!isCollapsed && courseOpen && (
          <div className="course-submenu">
            <Link to="/MyCourse" className="sidebar-sublink">
              <FaBook className="sidebar-icon" />
              <span>My Courses</span>
            </Link>
            <Link to="/CourseMaterials" className="sidebar-sublink">
              <FaBook className="sidebar-icon" />
              <span>Course Materials</span>
            </Link>
            <Link to="/TeacherAddCourse" className="sidebar-sublink">
              <FaBook className="sidebar-icon" />
              <span>Add Course</span>
            </Link>
          </div>
        )}
        <button className="sidebar-link" onClick={toggleStudents}>
          <FaUsers className="sidebar-icon" />
          {!isCollapsed && <span>Students</span>}
          {!isCollapsed && (studentsOpen ? <FaChevronUp className="sidebar-icon" /> : <FaChevronDown className="sidebar-icon" />)}
        </button>
        {!isCollapsed && studentsOpen && (
          <div className="students-submenu">
            <Link to="/StudentPage" className="sidebar-sublink">
              <FaUsers className="sidebar-icon" />
              <span>Add Student</span>
            </Link>
            <Link to="/AddMarks" className="sidebar-sublink">
              <FaBook className="sidebar-icon" />
              <span>Add Marks</span>
            </Link>
            <Link to="/ListMarks" className="sidebar-sublink">
              <FaBook className="sidebar-icon" />
              <span>List Marks</span>
            </Link>
            <Link to="/AddAttendance" className="sidebar-sublink">
              <FaUsers className="sidebar-icon" />
              <span>Add Attendance</span>
            </Link>
          </div>
        )}
        <Link to="/SettingsPage" className="sidebar-link">
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

export default TeacherSidebar;
