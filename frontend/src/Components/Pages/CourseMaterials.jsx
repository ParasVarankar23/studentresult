import React from 'react';
import './CourseMaterials.css';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function CourseMaterials() {
return (
    <div>
    <div>
    <Link to="/TeacherSidebar" className="student-page-back-arrow">
        <FaArrowLeft />
    </Link>
        <h1>Course Materials</h1>
    </div>
    <div className="video-gallery-container">
        <div className="video-item">
        <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/R9PTBwOzceo"
            title="Data Structures Overview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
        <div className="item-info">
            <p className="description">Introduction to Data Structures</p>
            <p className="additional-info">
            This video provides an overview of data structures, covering basic concepts like arrays, linked lists, stacks, and queues. 
            It is essential for building efficient algorithms and understanding how data is organized and manipulated.
            </p>
        </div>
        </div>

        <div className="video-item">
        <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/YRnjGeQbsHQ"
            title="Database Management Systems Overview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
        <div className="item-info">
            <p className="description">Introduction to DBMS</p>
            <p className="additional-info">
            Learn about the fundamental concepts of Database Management Systems (DBMS), including relational databases, SQL, 
            and the importance of data integrity and security in database design and management.
            </p>
        </div>
        </div>

        <div className="video-item">
        <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/6i3EGqOBRiU"
            title="Python Programming Basics"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
        <div className="item-info">
            <p className="description">Python Programming: Basics</p>
            <p className="additional-info">
            This video introduces the fundamentals of Python programming, including syntax, variables, and basic operations. 
            It’s perfect for beginners starting their journey in Python.
            </p>
        </div>
        </div>

        <div className="video-item">
        <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/XnSasPR2KJI"
            title="Python Programming Intermediate"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
        <div className="item-info">
            <p className="description">Python Programming: Intermediate Concepts</p>
            <p className="additional-info">
            Continue building your Python skills with this video that covers functions, modules, and error handling.
            A must-watch for those who want to progress beyond the basics in Python.
            </p>
        </div>
        </div>

        <div className="video-item">
        <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/HSWKPWN6fTQ?si=Z8sszWKAoRNyXDdU"
            title="Full Stack Development with Python and MySQL"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
        <div className="item-info">
            <p className="description">Full Stack Development: Python and MySQL</p>
            <p className="additional-info">
            Explore how to build a full-stack application using Python and MySQL. This tutorial guides you through 
            connecting the front end and back end with best practices for building scalable web applications.
            </p>
        </div>
        </div>

        <div className="video-item">
        <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/b-fCl-UDJuo?si=tBHjMkT2yINg-ygt"
            title="Introduction to IoT (Internet of Things)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
        <div className="item-info">
            <p className="description">Introduction to IoT</p>
            <p className="additional-info">
            This video introduces the Internet of Things (IoT), covering basic concepts, real-world applications, and 
            how connected devices communicate. Ideal for anyone curious about how IoT is transforming industries.
            </p>
        </div>
        </div>
    </div>
    </div>
);
}

export default CourseMaterials;
