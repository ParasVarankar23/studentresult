import React, { useEffect, useState } from 'react';
import './StudentReport.css';

const StudentReport = () => {
  const [student, setStudent] = useState({
    name: '',
    course: '',
    semester: '',
    seat_number: '',
    photo: null,
    subjects: [{
      id: Date.now(), // Unique ID for each subject
      code: '',
      title: '',
      credits: '',
      theory: '',
      internal: '',
      total: '',
      grade: '',
      earned: '',
      points: '',
      cxg: ''
    }],
  });

  useEffect(() => {
    // Fetch student info (if needed)
    fetch('http://localhost:8081/studentsinfo')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    // Fetch subjects info (if needed)
    fetch('http://localhost:8081/subjects')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value, files } = e.target;

    if (name === 'photo') {
      setStudent(prevStudent => ({
        ...prevStudent,
        photo: files[0] ? URL.createObjectURL(files[0]) : null
      }));
    } else if (name.startsWith('subject_')) {
      const [field, subjectId] = name.split('_').slice(1);
      const updatedSubjects = student.subjects.map(subject =>
        subject.id === parseInt(subjectId)
          ? { ...subject, [field]: value }
          : subject
      );
      setStudent(prevStudent => ({ ...prevStudent, subjects: updatedSubjects }));
    } else {
      setStudent(prevStudent => ({ ...prevStudent, [name]: value }));
    }
  };

  const addSubject = () => {
    setStudent(prevStudent => ({
      ...prevStudent,
      subjects: [...prevStudent.subjects, {
        id: Date.now(), // Unique ID for new subject
        code: '',
        title: '',
        credits: '',
        theory: '',
        internal: '',
        total: '',
        grade: '',
        earned: '',
        points: '',
        cxg: ''
      }],
    }));
  };

  const removeSubject = (id) => {
    setStudent(prevStudent => ({
      ...prevStudent,
      subjects: prevStudent.subjects.filter(subject => subject.id !== id)
    }));
  };

  const calculateGrade = (theory, internal) => {
    const theoryPassingMarks = 24;
    const internalPassingMarks = 9;
    const total = theory + internal;

    if (theory < theoryPassingMarks || internal < internalPassingMarks || total < 40) return 'F';
    if (total <= 50) return 'D';
    if (total <= 60) return 'C';
    if (total <= 70) return 'B';
    if (total <= 80) return 'A';
    return 'O';
  };

  const getGradePoints = (grade) => {
    switch (grade) {
      case 'O': return 10;
      case 'A': return 9;
      case 'B': return 8;
      case 'C': return 7;
      case 'D': return 6;
      default: return 0;
    }
  };

  const calculateSGPA = () => {
    const { subjects } = student;
    const totalCredits = subjects.reduce((sum, { credits }) => sum + parseFloat(credits || 0), 0);
    const totalCxg = subjects.reduce((sum, { cxg }) => sum + parseFloat(cxg || 0), 0);
    return totalCredits ? (totalCxg / totalCredits).toFixed(2) : '0.00';
  };

  const calculateTotals = () => {
    const { subjects } = student;
    const totalCredits = subjects.reduce((sum, { credits }) => sum + parseFloat(credits || 0), 0);
    const totalMarks = subjects.reduce((sum, { theory, internal }) => sum + (parseFloat(theory || 0) + parseFloat(internal || 0)), 0);
    const totalEarned = subjects.reduce((sum, { earned }) => sum + parseFloat(earned || 0), 0);
    const totalCxg = subjects.reduce((sum, { cxg }) => sum + parseFloat(cxg || 0), 0);
    return { totalCredits, totalMarks, totalEarned, totalCxg };
  };

  const getOverallGrade = () => {
    const sgpa = parseFloat(calculateSGPA());
    if (sgpa >= 9) return 'O';
    if (sgpa >= 8) return 'A+';
    if (sgpa >= 7) return 'A';
    if (sgpa >= 6) return 'B';
    if (sgpa >= 5) return 'C';
    if (sgpa >= 4) return 'D';
    return 'F';
  };

  const getRemark = () => parseFloat(calculateSGPA()) >= 4.0 ? 'Successful' : 'Unsuccessful';

  const generateReportCard = (e) => {
    e.preventDefault();
    const updatedSubjects = student.subjects.map(subject => {
      const theory = parseInt(subject.theory, 10) || 0;
      const internal = parseInt(subject.internal, 10) || 0;
      const grade = calculateGrade(theory, internal);
      const total = theory + internal;
      const earned = grade !== 'F' ? parseFloat(subject.credits || 0) : 0;
      const points = getGradePoints(grade);
      const cxg = earned * points;
      return { ...subject, total, grade, earned, points, cxg };
    });

    setStudent(prevStudent => ({ ...prevStudent, subjects: updatedSubjects }));
  };

  const printReportCard = () => {
    window.print();
  };

  const { totalCredits, totalMarks, totalEarned, totalCxg } = calculateTotals();

  return (
    <div className="student-report-card">
      <h1 className="title">Generate Report Card</h1>
      <form onSubmit={generateReportCard} className="report-form">
        <div className="row">
          <label className="label" htmlFor="name">Student Name:</label>
          <input className="input" type="text" id="name" name="name" value={student.name} onChange={handleInputChange} required />
        </div>
        <div className="row">
          <label className="label" htmlFor="course">Course:</label>
          <select className="select" id="course" name="course" value={student.course} onChange={handleInputChange} required>
            <option value="">Select Course</option>
            <option value="BSc IT">BSc IT</option>
            <option value="BSc CS">BSc CS</option>
            <option value="BCA">BCA</option>
          </select>
        </div>
        <div className="row">
          <label className="label" htmlFor="semester">Semester:</label>
          <select className="select" id="semester" name="semester" value={student.semester} onChange={handleInputChange} required>
            <option value="">Select Semester</option>
            <option value="Semester I">I</option>
            <option value="Semester II">II</option>
            <option value="Semester III">III</option>
            <option value="Semester IV">IV</option>
            <option value="Semester V">V</option>
            <option value="Semester VI">VI</option>
          </select>
        </div>
        <div className="row">
          <label className="label" htmlFor="seatNumber">Seat Number:</label>
          <input className="input" type="text" id="seat_number" name="seat_number" value={student.seat_number} onChange={handleInputChange} required />
        </div>
        <div className="row">
          <label className="label" htmlFor="photo">Photo:</label>
          <input className="input-file" type="file" id="photo" name="photo" accept="image/*" onChange={handleInputChange} />
        </div>
        <div className="subjects">
          <h2 className="subjects-title">Subjects</h2>
          {student.subjects.map(subject => (
            <div key={subject.id} className="subject">
              <div className="row">
                <label className="label" htmlFor={`subject_code_${subject.id}`}>Subject Code:</label>
                <input className="input" type="text" id={`code_${subject.id}`} name={`subject_code_${subject.id}`} value={subject.code} onChange={e => handleInputChange(e, subject.id)} required />
              </div>
              <div className="row">
                <label className="label" htmlFor={`subject_title_${subject.id}`}>Subject Title:</label>
                <input className="input" type="text" id={`title_${subject.id}`} name={`subject_title_${subject.id}`} value={subject.title} onChange={e => handleInputChange(e, subject.id)} required />
              </div>
              <div className="row">
                <label className="label" htmlFor={`subject_credits_${subject.id}`}>Credits:</label>
                <input className="input" type="number" id={`credits_${subject.id}`} name={`subject_credits_${subject.id}`} value={subject.credits} onChange={e => handleInputChange(e, subject.id)} required />
              </div>
              <div className="row">
                <label className="label" htmlFor={`subject_theory_${subject.id}`}>Theory Marks:</label>
                <input className="input" type="number" id={`theory_${subject.id}`} name={`subject_theory_${subject.id}`} value={subject.theory} onChange={e => handleInputChange(e, subject.id)} required />
              </div>
              <div className="row">
                <label className="label" htmlFor={`subject_internal_${subject.id}`}>Internal Marks:</label>
                <input className="input" type="number" id={`internal_${subject.id}`} name={`subject_internal_${subject.id}`} value={subject.internal} onChange={e => handleInputChange(e, subject.id)} required />
              </div>
              <div className="row">
                <label className="label" htmlFor={`subject_total_${subject.id}`}>Total Marks:</label>
                <input className="input" type="text" id={`total_${subject.id}`} name={`subject_total_${subject.id}`} value={subject.total} readOnly />
              </div>
              <div className="row">
                <label className="label" htmlFor={`subject_grade_${subject.id}`}>Grade:</label>
                <input className="input" type="text" id={`subject_grade_${subject.id}`} name={`subject_grade_${subject.id}`} value={subject.grade} readOnly />
              </div>
              <div className="row">
                <label className="label" htmlFor={`subject_earned_${subject.id}`}>Credits Earned:</label>
                <input className="input" type="text" id={`earned_${subject.id}`} name={`subject_earned_${subject.id}`} value={subject.earned} readOnly />
              </div>
              <div className="row">
                <label className="label" htmlFor={`subject_points_${subject.id}`}>Grade Points:</label>
                <input className="input" type="text" id={`points_${subject.id}`} name={`subject_points_${subject.id}`} value={subject.points} readOnly />
              </div>
              <div className="row">
                <label className="label" htmlFor={`subject_cxg_${subject.id}`}>CXG:</label>
                <input className="input" type="text" id={`cxg_${subject.id}`} name={`subject_cxg_${subject.id}`} value={subject.cxg} readOnly />
              </div>
              <button type="button" onClick={() => removeSubject(subject.id)} className="remove-subject-btn">Remove Subject</button>
            </div>
          ))}
          <button type="button" onClick={addSubject} className="add-subject-btn">Add Subject</button>
        </div>
        <button type="submit" className="generate-btn">Generate Report Card</button>
      </form>
      <div className="personal-info">
          <h1>Student Report Card</h1>
          <h2>S.N.K.Jr College</h2>
          <h3>Borli Panchatan</h3>
          <div className="personal-details">
          {student.photo && <img src={student.photo} alt="Student" className="student-photo" />}
            <p><strong>Student Name:</strong> {student.name}</p>
            <p><strong>Course:</strong> {student.course}</p>
            <p><strong>Semester:</strong> {student.semester}</p>
            <p><strong>Seat Number:</strong> {student.seat_number}</p>
          </div>
        </div>
      {student.subjects.length > 0 && (
        <div className="report-summary">
          <h2 className="summary-title">Report Summary</h2>
          <table className="report-table">
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Subject Title</th>
                <th>Credits</th>
                <th>Theory Marks</th>
                <th>Internal Marks</th>
                <th>Total Marks</th>
                <th>Grade</th>
                <th>Credits Earned</th>
                <th>Grade Points</th>
                <th>CXG</th>
              </tr>
            </thead>
            <tbody>
              {student.subjects.map(subject => (
                <tr key={subject.id}>
                  <td>{subject.code}</td>
                  <td>{subject.title}</td>
                  <td>{subject.credits}</td>
                  <td>{subject.theory}</td>
                  <td>{subject.internal}</td>
                  <td>{subject.total}</td>
                  <td>{subject.grade}</td>
                  <td>{subject.earned}</td>
                  <td>{subject.points}</td>
                  <td>{subject.cxg}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="summary-details">
            <p>Total Credits: {totalCredits}</p>
            <p>Total Marks: {totalMarks}</p>
            <p>Total Credits Earned: {totalEarned}</p>
            <p>Total CXG: {totalCxg}</p>
            <p>SGPA: {calculateSGPA()}</p>
            <p>Overall Grade: {getOverallGrade()}</p>
            <p>Remark: {getRemark()}</p>
          </div>
          <button onClick={printReportCard} className="print-btn">Print Report Card</button>
        </div>
      )}
    </div>
  );
};

export default StudentReport;
