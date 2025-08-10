import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { FaTachometerAlt, FaUserCog, FaChalkboardTeacher, FaBook, FaUsers, FaSignOutAlt, FaCog, FaChevronUp, FaChevronDown, FaChartBar } from 'react-icons/fa';
import './AdminSidebar.css';
import Result from '../../Assets/result.jpg';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleUser = () => setUserOpen(!userOpen);
  const toggleCourse = () => setCourseOpen(!courseOpen);
  const toggleSchedule = () => setScheduleOpen(!scheduleOpen);
  const toggleReport = () => setReportOpen(!reportOpen);

  return (
    <div className="dashboard-container-college">
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-container">
          <button
            className="sidebar-link"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <MenuIcon className='menu-icon' />
          </button>
          <div className="sidebar-item">
            <Link to="/AdminDashboard" className="sidebar-link">
              <FaTachometerAlt className="sidebar-icon" />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          </div>
          <button
            className="sidebar-link"
            onClick={toggleUser}
            aria-label="Toggle Users Menu"
          >
            <FaUserCog className="sidebar-icon" />
            {!isCollapsed && <span>Users</span>}
            {!isCollapsed && (userOpen ? <FaChevronUp className="sidebar-icon" /> : <FaChevronDown className="sidebar-icon" />)}
          </button>
          {!isCollapsed && userOpen && (
            <div className="user-submenu">
              <Link to="/ManageStudentPage" className="sidebar-sublink">
                <FaUsers className="sidebar-icon" />
                <span>Manage Students</span>
              </Link>
              <Link to="/ManageTeacherPage" className="sidebar-sublink">
                <FaChalkboardTeacher className="sidebar-icon" />
                <span>Manage Teachers</span>
              </Link>
            </div>
          )}
          <button
            className="sidebar-link"
            onClick={toggleCourse}
            aria-label="Toggle Courses Menu"
          >
            <FaBook className="sidebar-icon" />
            {!isCollapsed && <span>Courses</span>}
            {!isCollapsed && (courseOpen ? <FaChevronUp className="sidebar-icon" /> : <FaChevronDown className="sidebar-icon" />)}
          </button>
          {!isCollapsed && courseOpen && (
            <div className="course-submenu">
              <Link to="/CoursePage" className="sidebar-sublink">
                <FaBook className="sidebar-icon" />
                <span>Add Course</span>
              </Link>
              <Link to="/CourseListPage" className="sidebar-sublink">
                <FaBook className="sidebar-icon" />
                <span>Course List</span>
              </Link>
            </div>
          )}
          <button
            className="sidebar-link"
            onClick={toggleSchedule}
            aria-label="Toggle Schedule Menu"
          >
            <FaChalkboardTeacher className="sidebar-icon" />
            {!isCollapsed && <span>Schedule</span>}
            {!isCollapsed && (scheduleOpen ? <FaChevronUp className="sidebar-icon" /> : <FaChevronDown className="sidebar-icon" />)}
          </button>
          {!isCollapsed && scheduleOpen && (
            <div className="schedule-submenu">
              <Link to="/ClassSchedule" className="sidebar-sublink">
                <FaChalkboardTeacher className="sidebar-icon" />
                <span>Class Schedule</span>
              </Link>
              <Link to="/ExamSchedule" className="sidebar-sublink">
                <FaChalkboardTeacher className="sidebar-icon" />
                <span>Exam Schedule</span>
              </Link>
            </div>
          )}
          <button
            className="sidebar-link"
            onClick={toggleReport}
            aria-label="Toggle Reports Menu"
          >
            <FaChartBar className="sidebar-icon" />
            {!isCollapsed && <span>Reports</span>}
            {!isCollapsed && (reportOpen ? <FaChevronUp className="sidebar-icon" /> : <FaChevronDown className="sidebar-icon" />)}
          </button>
          {!isCollapsed && reportOpen && (
            <div className="report-submenu">
              <Link to="/StudentReport" className="sidebar-sublink">
                <FaChartBar className="sidebar-icon" />
                <span>Student Reports</span>
              </Link>
              <Link to="/ManageReportPage" className="sidebar-sublink">
                <FaChartBar className="sidebar-icon" />
                <span>Manage Reports</span>
              </Link>
            </div>
          )}
          <div className="sidebar-item">
            <Link to="/Settings" className="sidebar-link">
              <FaCog className="sidebar-icon" />
              {!isCollapsed && <span>Settings</span>}
            </Link>
          </div>
          <div className="sidebar-item">
            <Link to="/" className="sidebar-link">
              <FaSignOutAlt className="sidebar-icon" />
              {!isCollapsed && <span>Logout</span>}
            </Link>
          </div>
        </div>
      </div>
      <div className="image-container-admin">
        <img src={Result} alt="Result" />
      </div>
    </div>
  );
};

export default AdminSidebar;
