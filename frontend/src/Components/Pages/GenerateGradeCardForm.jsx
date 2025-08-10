import React, { useState } from 'react';
import Profile from '../../Assets/photo.jpg';
import './GenerateGradeCardForm.css';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function GenerateGradeCardForm() {
  const [seatNumber, setSeatNumber] = useState('');
  const [motherName, setMotherName] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (seatNumber === '2302' && motherName.toLowerCase() === 'prachi') {
      setShowResult(true);
    } else {
      alert('Invalid Seat Number or Mother Name');
    }
  };

  return (
    <div className="generate-grade-card-form">
      <div className="generate-grade-card-form-header">
      <Link to='/StudentSidebar'>
                <FaArrowLeft className="back-arrow-grade-card" />
            </Link>
        <h2>Generate Grade Card</h2>
      </div>
      <div className="generate-grade-card-form-inputs">
        <label htmlFor="seatNumber">Seat Number:</label>
        <input
          type="text"
          placeholder="Enter your Seat Number"
          value={seatNumber}
          onChange={(e) => setSeatNumber(e.target.value)}
        /><br />
        <label htmlFor="motherName">Mother Name:</label>
        <input
          type="text"
          placeholder="Enter your Mother Name"
          value={motherName}
          onChange={(e) => setMotherName(e.target.value)}
        /><br />
        <button onClick={handleSubmit}>View Card</button>
      </div>
      {showResult && (
        <div className="generate-grade-card-form-result">
          <div className="generate-grade-card-form-result-info">
            <p><b>NAME:</b> Paras Pramod Varankar</p>
            <p><b>EXAMINATION:</b> OCTOBER 2024</p>
            <p><b>SEAT NUMBER:</b> 2302</p>
            <p><b>COURSE NAME:</b> BSc IT</p>
            <img src={Profile} alt="Profile" className="generate-grade-card-form-img"/>
          </div>
          <div className="generate-grade-card-form-table">
            <table>
              <thead>
                <tr>
                  <th>COURSE CODE</th>
                  <th>COURSE TITLE</th>
                  <th>COURSE CREDITS</th>
                  <th>THEORY</th>
                  <th>INTERNAL</th>
                  <th>TOTAL</th>
                  <th>GRADE</th>
                  <th>CREDITS EARNED (C)</th>
                  <th>GRADE POINTS (G)</th>
                  <th>CXG</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PUAEC101</td>
                  <td>HUMAN VALUES</td>
                  <td>2</td>
                  <td>72</td>
                  <td></td>
                  <td>72</td>
                  <td>A+</td>
                  <td>2</td>
                  <td>9</td>
                  <td>18</td>
                </tr>
                <tr>
                  <td>PUSBT104B</td>
                  <td>ECOLOGY SYSTEM</td>
                  <td>4</td>
                  <td>84</td>
                  <td></td>
                  <td>84</td>
                  <td>O</td>
                  <td>4</td>
                  <td>10</td>
                  <td>40</td>
                </tr>
                <tr>
                  <td>PUSIT101</td>
                  <td>PYTHON PROGRAMMING</td>
                  <td>2</td>
                  <td>55</td>
                  <td>28</td>
                  <td>82</td>
                  <td>O</td>
                  <td>2</td>
                  <td>10</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>PUSIT102</td>
                  <td>DBMS</td>
                  <td>2</td>
                  <td>56</td>
                  <td>28</td>
                  <td>84</td>
                  <td>O</td>
                  <td>2</td>
                  <td>10</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>PUSIT103</td>
                  <td>MATHEMATICS</td>
                  <td>2</td>
                  <td>57</td>
                  <td>32</td>
                  <td>89</td>
                  <td>O</td>
                  <td>2</td>
                  <td>10</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>PUSIT104</td>
                  <td>IT FUNDAMENTALS</td>
                  <td>2</td>
                  <td>90</td>
                  <td></td>
                  <td>90</td>
                  <td>O</td>
                  <td>2</td>
                  <td>10</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td></td>
                  <td>Total</td>
                  <td>14</td>
                  <td></td>
                  <td></td>
                  <td>501</td>
                  <td></td>
                  <td>14</td>
                  <td></td>
                  <td>138</td>
                </tr>
                <tr>
                  <td colSpan="6">Total Percentage: 95%</td>
                  <td colSpan="4">Status: Excellent</td>
                </tr>
                <tr>
                  <td colSpan="10">Remark: Successful</td>
                </tr>
                <tr>
                  <td colSpan="10">SGPA: 9.93 | Overall Grade: A+</td>
                </tr>
                <tr>
                  <td colSpan="10">Result Date: 10/09/2024</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default GenerateGradeCardForm;
