import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './TeacherProfile.css';

const TeacherProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        teacherName: 'Jagruti Karale',
        gender: 'Female',
        dob: '15-08-1980',
        email: 'jagruti.karale@ruia.edu.in',
        contactNo: '9876543210',
        department: 'Computer Science',
        degree: 'MCA',
        college: 'Ruia College',
        address: '456, Main Street, Dadar, Mumbai',
        joinDate: '01-01-2020',
        grade: 'A',
        educationDetails: {
            degree: 'MCA',
            institute: 'Ruia College',
            yearOfPassing: '2004',
        },
        contactDetails: {
            phone: '9876543210',
            email: 'jagruti.karale@ruia.edu.in',
            address: '456, Main Street, Dadar, Mumbai',
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        alert('Profile saved successfully!');
    };

    return (
        <div className="teacher-profile-container">
            <Link to="/TeacherSidebar" className="teacher-profile-back-arrow">
                <FaArrowLeft />
            </Link>
            <h1>Teacher Profile</h1>

            <div className="teacher-profile-section">
                <h2>Personal Details</h2>
                <div className="teacher-profile-grid">
                    <p>
                        <strong>Teacher Name:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="teacherName"
                                value={profile.teacherName}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            profile.teacherName
                        )}
                    </p>
                    <p>
                        <strong>Gender:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="gender"
                                value={profile.gender}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            profile.gender
                        )}
                    </p>
                    <p>
                        <strong>Date Of Birth:</strong>
                        {isEditing ? (
                            <input
                                type="date"
                                name="dob"
                                value={profile.dob}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            profile.dob
                        )}
                    </p>
                    <p>
                        <strong>Email:</strong>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            profile.email
                        )}
                    </p>
                    <p>
                        <strong>Contact No:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="contactNo"
                                value={profile.contactNo}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            profile.contactNo
                        )}
                    </p>
                    <p>
                        <strong>Department:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="department"
                                value={profile.department}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            profile.department
                        )}
                    </p>
                    <p>
                        <strong>Degree:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="degree"
                                value={profile.degree}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            profile.degree
                        )}
                    </p>
                    <p>
                        <strong>College:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="college"
                                value={profile.college}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            profile.college
                        )}
                    </p>
                    <p>
                        <strong>Address:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="address"
                                value={profile.address}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            profile.address
                        )}
                    </p>
                    <p>
                        <strong>Joining Date:</strong>
                        {isEditing ? (
                            <input
                                type="date"
                                name="joinDate"
                                value={profile.joinDate}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            profile.joinDate
                        )}
                    </p>
                    <p>
                        <strong>Grade:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="grade"
                                value={profile.grade}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            profile.grade
                        )}
                    </p>
                </div>
            </div>

            <div className="teacher-profile-section">
                <h2>Education Details</h2>
                <div className="teacher-profile-grid">
                    <p>
                        <strong>Degree:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="educationDegree"
                                value={profile.educationDetails.degree}
                                onChange={(e) => setProfile((prevProfile) => ({
                                    ...prevProfile,
                                    educationDetails: {
                                        ...prevProfile.educationDetails,
                                        degree: e.target.value
                                    }
                                }))}
                                required
                            />
                        ) : (
                            profile.educationDetails.degree
                        )}
                    </p>
                    <p>
                        <strong>Institute:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="educationInstitute"
                                value={profile.educationDetails.institute}
                                onChange={(e) => setProfile((prevProfile) => ({
                                    ...prevProfile,
                                    educationDetails: {
                                        ...prevProfile.educationDetails,
                                        institute: e.target.value
                                    }
                                }))}
                                required
                            />
                        ) : (
                            profile.educationDetails.institute
                        )}
                    </p>
                    <p>
                        <strong>Year of Passing:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="educationYearOfPassing"
                                value={profile.educationDetails.yearOfPassing}
                                onChange={(e) => setProfile((prevProfile) => ({
                                    ...prevProfile,
                                    educationDetails: {
                                        ...prevProfile.educationDetails,
                                        yearOfPassing: e.target.value
                                    }
                                }))}
                                required
                            />
                        ) : (
                            profile.educationDetails.yearOfPassing
                        )}
                    </p>
                </div>
            </div>

            <div className="teacher-profile-section">
                <h2>Contact Details</h2>
                <div className="teacher-profile-grid">
                    <p>
                        <strong>Phone:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="contactPhone"
                                value={profile.contactDetails.phone}
                                onChange={(e) => setProfile((prevProfile) => ({
                                    ...prevProfile,
                                    contactDetails: {
                                        ...prevProfile.contactDetails,
                                        phone: e.target.value
                                    }
                                }))}
                                required
                            />
                        ) : (
                            profile.contactDetails.phone
                        )}
                    </p>
                    <p>
                        <strong>Email:</strong>
                        {isEditing ? (
                            <input
                                type="email"
                                name="contactEmail"
                                value={profile.contactDetails.email}
                                onChange={(e) => setProfile((prevProfile) => ({
                                    ...prevProfile,
                                    contactDetails: {
                                        ...prevProfile.contactDetails,
                                        email: e.target.value
                                    }
                                }))}
                                required
                            />
                        ) : (
                            profile.contactDetails.email
                        )}
                    </p>
                    <p>
                        <strong>Address:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="contactAddress"
                                value={profile.contactDetails.address}
                                onChange={(e) => setProfile((prevProfile) => ({
                                    ...prevProfile,
                                    contactDetails: {
                                        ...prevProfile.contactDetails,
                                        address: e.target.value
                                    }
                                }))}
                                required
                            />
                        ) : (
                            profile.contactDetails.address
                        )}
                    </p>
                </div>
            </div>

            <div className="teacher-profile-buttons">
                {isEditing ? (
                    <button className="teacher-profile-save-btn" onClick={handleSaveClick}>
                        Save
                    </button>
                ) : (
                    <button className="teacher-profile-edit-btn" onClick={handleEditClick}>
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
};

export default TeacherProfile;
