import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
    const [profile, setProfile] = useState({
        applicationId: '2023PC0682',
        studentName: 'VARANKAR PARAS PRAMOD',
        gender: 'Male',
        dob: '12-23-2005',
        fatherName: 'PRAMOD VARANKAR',
        motherName: 'PRACHI',
        email: 'VPARAS23IT@STUDENT.MES.AC.IN',
        contactNo: '9309940782',
        religion: 'Hindu',
        caste: 'HINDU',
        category: 'NT',
        nationality: 'INDIAN',
        birthPlace: 'MUMBAI',
        birthDistrict: 'MUMBAI',
        bloodGroup: 'B+',
        permanentAddress: '68, VANJALE GAUL VADI, BORLI PANCHATAN, TAL - SHRIVARDHAN',
        pinCode: '402403',
        motherTongue: 'MARATHI',
        admissionDetails: {
            courseCode: '719PUSIT',
            courseName: 'B.SC. INFORMATION TECHNOLOGY',
            admissionDate: '21-06-2023',
            academicYear: '2024-2025',
            rollNumber: '5585',
            division: 'B',
        },
        parentDetails: {
            name: 'PRAMOD KERU VARANKAR',
            email: 'PRAMODVARANKAR0141@GMAIL.COM',
            contact: '9225677401',
            occupation: 'MECHANIC',
            address: '68, VANJALE GAUL VADI, BORLI PANCHATAN, TAL - SHRIVARDHAN',
        },
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
        <div className="profile-container">
            <Link to="/StudentSidebar" className="back-arrow-profile">
                <FaArrowLeft />
            </Link>
            <h1>Profile Details</h1>

            <div className="profile-section">
                <h2>Personal Details</h2>
                <div className="profile-grid">
                    <p>
                        <strong>Application Id:</strong> {profile.applicationId}
                    </p>
                    <p>
                        <strong>Student Name:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="studentName"
                                value={profile.studentName}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            profile.studentName
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
                        <strong>Father Name:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="fatherName"
                                value={profile.fatherName}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            profile.fatherName
                        )}
                    </p>
                    <p>
                        <strong>Mother Name:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="motherName"
                                value={profile.motherName}
                                onChange={handleInputChange}
                                required
                            />
                        ) : (
                            profile.motherName
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
                </div>
            </div>

            <div className="profile-section">
                <h2>Admission Details</h2>
                <div className="profile-grid">
                    <p>
                        <strong>Course Code:</strong> {profile.admissionDetails.courseCode}
                    </p>
                    <p>
                        <strong>Course Name:</strong> {profile.admissionDetails.courseName}
                    </p>
                    <p>
                        <strong>Admission Date:</strong> {profile.admissionDetails.admissionDate}
                    </p>
                </div>
            </div>

            <div className="profile-section">
                <h2>Parent Details</h2>
                <div className="profile-grid">
                    <p>
                        <strong>Parent Name:</strong> {profile.parentDetails.name}
                    </p>
                    <p>
                        <strong>Contact No:</strong> {profile.parentDetails.contact}
                    </p>
                </div>
            </div>

            <div className="profile-buttons">
                {isEditing ? (
                    <button className="save-btn" onClick={handleSaveClick}>
                        Save
                    </button>
                ) : (
                    <button className="edit-btn" onClick={handleEditClick}>
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
};

export default Profile;
