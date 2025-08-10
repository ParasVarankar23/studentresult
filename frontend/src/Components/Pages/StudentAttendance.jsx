import React, { useEffect, useState } from 'react';
import './StudentAttendance.css';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const StudentAttendance = () => {
const [attendanceData, setAttendanceData] = useState([]);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
    const fetchAttendanceData = async () => {
    const data = [
        { rollNo: '101', studentName: 'Paras Varankar', subjectCode: 'IT301', subjectName: 'Advanced Java', lecturesAbsent: 2, lecturesPresent: 18, totalLectures: 20 },
        { rollNo: '101', studentName: 'Paras Varankar', subjectCode: 'IT302', subjectName: 'Operation Research', lecturesAbsent: 1, lecturesPresent: 19, totalLectures: 20 },
        { rollNo: '101', studentName: 'Paras Varankar', subjectCode: 'IT303', subjectName: 'ADBMS', lecturesAbsent: 0, lecturesPresent: 20, totalLectures: 20 },
        { rollNo: '101', studentName: 'Paras Varankar', subjectCode: 'IT304', subjectName: 'Full Stack Development', lecturesAbsent: 3, lecturesPresent: 17, totalLectures: 20 },
        { rollNo: '101', studentName: 'Paras Varankar', subjectCode: 'IT305', subjectName: 'Soft Skills', lecturesAbsent: 2, lecturesPresent: 18, totalLectures: 20 },
        { rollNo: '101', studentName: 'Paras Varankar', subjectCode: 'IT306', subjectName: 'Mini Project', lecturesAbsent: 1, lecturesPresent: 19, totalLectures: 20 },
    ];
    setAttendanceData(data);
    };

    fetchAttendanceData();
}, []);

const handleLogin = () => {
    if (email === 'vparas23it@student.mes.ac.in' && password === 'Siddhi126@') {
    setIsAuthenticated(true);
    } else {
    alert('Invalid email or password');
    }
};

const calculatePercentage = (present, total) => {
    if (total === 0) return 0;
    return (present / total) * 100;
};

const calculateOverallPercentage = () => {
    const totalLectures = attendanceData.reduce((total, record) => total + record.totalLectures, 0);
    const totalPresent = attendanceData.reduce((total, record) => total + record.lecturesPresent, 0);
    return calculatePercentage(totalPresent, totalLectures).toFixed(2);
};

return (
    <div className="attendance-page">
    {!isAuthenticated ? (
        <div className="login-form-attendance">
            <Link to='/StudentSidebar'>
                <FaArrowLeft className="back-arrow-attendance" />
            </Link>
        <h2>Attendance Report</h2><br></br>
        <label htmlFor='Enter your Mail Id'>Enter your mail Id</label>
        <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='Password'>Enter your Password</label>
        <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>View Attendance</button>
        </div>
    ) : (
        <>
        <h1>Student Attendance</h1>
        <table className="attendance-table">
            <thead>
            <tr>
                <th>Roll No.</th>
                <th>Subject Name</th>
                <th>Subject Code</th>
                <th>Student Name</th>
                <th>Lectures Absent</th>
                <th>Lectures Present</th>
                <th>Percentage per Subject</th>
            </tr>
            </thead>
            <tbody>
            {attendanceData.map((record) => (
            <tr key={`${record.rollNo}-${record.subjectCode}`}>
                <td>{record.rollNo}</td>
                <td>{record.subjectName}</td>
                <td>{record.subjectCode}</td>
                <td>{record.studentName}</td>
                <td>{record.lecturesAbsent}</td>
                <td>{record.lecturesPresent}</td>
                <td>{calculatePercentage(record.lecturesPresent, record.totalLectures).toFixed(2)}%</td>
                </tr>
            ))}
            <tr className="total-row">
                <td colSpan="5" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Attendance Percentage:</td>
                <td colSpan="2" style={{ fontWeight: 'bold' }}>{calculateOverallPercentage()}%</td>
            </tr>
            </tbody>
        </table>
        </>
    )}
    </div>
);
};

export default StudentAttendance;
