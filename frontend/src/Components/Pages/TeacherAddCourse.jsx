import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './TeacherAddCourse.css';

const TeacherAddCourse = () => {
	const [formData, setFormData] = useState({
		topicName: '',
		media: null
	});
	const [courses, setCourses] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [modalContent, setModalContent] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFileChange = (e) => {
		setFormData({ ...formData, media: e.target.files[0] });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setCourses([...courses, { ...formData, id: Date.now() }]);
		setIsSuccess(true);
		setModalContent('Course Added Successfully!');
		setModalVisible(true);
		setFormData({ topicName: '', media: null });
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const openMedia = (file) => {
		const mediaUrl = URL.createObjectURL(file);
		window.open(mediaUrl, '_blank');
	};

	return (
		<div className="teacher-add-course-container">
			<h2>Add Course Materials</h2>
			<form onSubmit={handleSubmit} className="teacher-add-course-form">
				<input
					type="text"
					name="topicName"
					value={formData.topicName}
					onChange={handleChange}
					placeholder="Topic Name"
					required
				/>
				<input
					type="file"
					name="media"
					onChange={handleFileChange}
					accept="image/*,video/*"
					required
				/>
				<button type="submit">Add Course</button>
			</form>
			<div className="course-table">
				<h3>Course List</h3>
				<table>
					<thead>
						<tr>
							<th>Topic Name</th>
							<th>Media</th>
						</tr>
					</thead>
					<tbody>
						{courses.map((course) => (
							<tr key={course.id}>
								<td>{course.topicName}</td>
								<td>
									{course.media ? (
										<button
											onClick={() => openMedia(course.media)}
											className="media-button"
											tabIndex={0}
											onKeyDown={(e) => {
												if (e.key === 'Enter') openMedia(course.media);
											}}
										>
											{course.media.name}
										</button>
									) : (
										'N/A'
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{modalVisible && (
				<div className="modal">
					<div className="modal-content">
						{isSuccess ? (
							<FaCheckCircle className="success-icon" />
						) : (
							<FaTimesCircle className="error-icon" />
						)}
						<p>{modalContent}</p>
						<button className="ok-button-main" onClick={closeModal}>OK</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default TeacherAddCourse;
