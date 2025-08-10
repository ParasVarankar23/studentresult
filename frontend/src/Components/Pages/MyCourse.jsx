import React from 'react';
import pdf1 from '../../Assets/Unit1.pdf';
import pdf2 from '../../Assets/Unit2.pdf';
import pdf3 from '../../Assets/Unit3.pdf';
import pdf4 from '../../Assets/Unit4.pdf';
import './MyCourse.css';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function MyCourse() {
    return (
        <div>
            <div>
            <Link to="/TeacherSidebar" className="student-page-back-arrow">
            <FaArrowLeft />
            </Link>
            </div>
            <h1>Full Stack Development</h1>
            <h1>Course Materials</h1>
            <div>
                <div className="pdf-gallery">
                    <div className="pdf-item">
                        <h3>PDF 1: Introduction</h3>
                        <embed src={pdf1} type="application/pdf" width="100%" height="800" />
                    </div>
                    <div className="pdf-item">
                        <h3>PDF 2: Advanced Topics</h3>
                        <embed src={pdf2} type="application/pdf" width="100%" height="800" />
                    </div>
                    <div className="pdf-item">
                        <h3>PDF 3: Case Studies</h3>
                        <embed src={pdf3} type="application/pdf" width="100%" height="800" />
                    </div>
                    <div className="pdf-item">
                        <h3>PDF 4: References</h3>
                        <embed src={pdf4} type="application/pdf" width="100%" height="800" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyCourse;
