const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const app = express();
const port = 8081;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connections
let studentDb;
let teacherDb;
let courseDb;
let classDb;
let examDb;
let resultDb;
let userDb;
let attendanceDb;
let marksDb;

function handleDbDisconnect(dbConfig, dbName) {
    const db = mysql.createConnection(dbConfig);
    
    db.connect((err) => {
        if (err) {
            console.error(`Error connecting to the ${dbName} database:`, err);
            setTimeout(() => handleDbDisconnect(dbConfig, dbName), 2000);
        } else {
            console.log(`Connected to the ${dbName} database.`);
        }
    });

    db.on('error', (err) => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.fatal) {
            handleDbDisconnect(dbConfig, dbName);
        } else {
            throw err;
        }
    });

    return db;
}

// Connection configurations
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Siddhi126@'
};

// Initialize connections
studentDb = handleDbDisconnect({ ...dbConfig, database: 'college_management' }, 'college_management');
teacherDb = handleDbDisconnect({ ...dbConfig, database: 'teacher_management' }, 'teacher_management');
courseDb = handleDbDisconnect({ ...dbConfig, database: 'course_management' }, 'course_management');
classDb = handleDbDisconnect({ ...dbConfig, database: 'class_management' }, 'class_management');
examDb = handleDbDisconnect({ ...dbConfig, database: 'exam_management' }, 'exam_management');
resultDb = handleDbDisconnect({ ...dbConfig, database: 'result_management' }, 'result_management');
userDb = handleDbDisconnect({ ...dbConfig, database: 'user_db' }, 'user_db');
attendanceDb = handleDbDisconnect({ ...dbConfig, database: 'attendance_management' }, 'attendance_management');
marksDb = handleDbDisconnect({ ...dbConfig, database: 'marks_management' }, 'marks_management');

app.post('/marks', (req, res) => {
    const { studentName, rollNo, course, class: className, subjectCode, subject, theory, internal, total } = req.body;
    const id = uuidv4();

    console.log('Inserting record:', { id, studentName, rollNo, course, className, subjectCode, subject, theory, internal, total });

    const sql = 'INSERT INTO Marks (id, studentName, rollNo, course, class, subjectCode, subject, theory, internal, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    marksDb.query(sql, [id, studentName, rollNo, course, className, subjectCode, subject, theory, internal, total], (err) => {
        if (err) {
            console.error('Error inserting record:', err);
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id });
        }
    });
});

// Fetch all marks records
app.get('/marks', (req, res) => {
    const sql = 'SELECT * FROM Marks';
    marksDb.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching marks:', err);
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
});

// Update marks record
app.put('/update-marks/:id', (req, res) => {
    const { id } = req.params;
    const { studentName, rollNo, course, class: className, subjectCode, subject, theory, internal, total } = req.body;

    const sql = 'UPDATE Marks SET studentName = ?, rollNo = ?, course = ?, class = ?, subjectCode = ?, subject = ?, theory = ?, internal = ?, total = ? WHERE id = ?';
    marksDb.query(sql, [studentName, rollNo, course, className, subjectCode, subject, theory, internal, total, id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Record updated successfully.' });
        }
    });
});

// Delete marks record
app.delete('/delete-marks/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM Marks WHERE id = ?';
    marksDb.query(sql, [id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Record deleted successfully.' });
        }
    });
});

// Get a specific marks record by ID
app.get('/marks/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM Marks WHERE id = ?';
    marksDb.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Record not found.' });
        } else {
            res.status(200).json(results[0]);
        }
    });
});
// Add Attendance Endpoint
app.post('/add-attendance', (req, res) => {
    const { studentName, rollNo, course, class: className, subjectCode, subject, date, status } = req.body;

    const sql = 'INSERT INTO Attendance (studentName, rollNo, course, class, subjectCode, subject, date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    attendanceDb.query(sql, [studentName, rollNo, course, className, subjectCode, subject, date, status], (err, result) => {
    if (err) {
        return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Attendance added successfully', id: result.insertId });
    });
});

app.get('/attendance', (req, res) => {
    const sql = 'SELECT * FROM Attendance';
    attendanceDb.query(sql, (err, results) => { // Use attendanceDb.query here
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});
// Create users table if not exists
const createTable = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
)`;
userDb.query(createTable, (err) => {
    if (err) throw err;
    console.log('Users table created or already exists');
});

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        userDb.query(query, [email, hashedPassword], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error signing up' });
            }
            res.status(200).json({ message: 'Signup successful' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error hashing password' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    userDb.query(query, [email], async (err, result) => {
        if (err || result.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = result[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', user });
    });
});


// Routes for Students (college_management)
app.get('/students', (req, res) => {
    const query = 'SELECT * FROM students';
    studentDb.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a new student
app.post('/students', (req, res) => {
    const { first_name, last_name, course, semester, email, phone, enrollment_date, status } = req.body;
    const query = 'INSERT INTO students (first_name, last_name, course, semester, email, phone, enrollment_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    studentDb.query(query, [first_name, last_name, course, semester, email, phone, enrollment_date, status], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Student added successfully' });
    });
});

// Update student
app.put('/students/:id', (req, res) => {
    const { first_name, last_name, course, semester, email, phone, enrollment_date, status } = req.body;
    const query = 'UPDATE students SET first_name = ?, last_name = ?, course = ?, semester = ?, email = ?, phone = ?, enrollment_date = ?, status = ? WHERE student_id = ?';
    studentDb.query(query, [first_name, last_name, course, semester, email, phone, enrollment_date, status, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Student not found' });
        res.json({ message: 'Student updated successfully' });
    });
});

// Delete student
app.delete('/students/:id', (req, res) => {
    const query = 'DELETE FROM students WHERE student_id = ?';
    studentDb.query(query, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Student not found' });
        res.json({ message: 'Student deleted successfully' });
    });
});


// Routes for Teachers (teacher_management)
app.get('/teachermanagement', (req, res) => {
    teacherDb.query('SELECT * FROM teachers', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/teachermanagement/:id', (req, res) => {
    const { id } = req.params;
    teacherDb.query('SELECT * FROM teachers WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
});

app.post('/teachermanagement', (req, res) => {
    const teacher = req.body;
    const query = 'INSERT INTO teachers (first_name, last_name, email, phone, department, hiring_date, status, qualification, experience) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    teacherDb.query(query, [teacher.firstname, teacher.last_name, teacher.email, teacher.phone, teacher.department, teacher.hiring_date, teacher.status, teacher.qualification, teacher.experience], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Teacher added successfully', id: results.insertId });
    });
});
app.put('/teachermanagement/:id', (req, res) => {
    const teacher = req.body;
    const query = 'UPDATE teachers SET first_name = ?, last_name = ?, email = ?, phone = ?, department = ?, hiring_date = ?, status = ?, qualification = ?, experience = ? WHERE id = ?';
    teacherDb.query(query, [teacher.first_name, teacher.last_name, teacher.email, teacher.phone, teacher.department, teacher.hiring_date, teacher.status, teacher.qualification, teacher.experience, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Teacher updated successfully' });
    });
});


app.delete('/teachermanagement/:id', (req, res) => {
    teacherDb.query('DELETE FROM teachers WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Teacher deleted successfully' });
    });
});

// Routes for Courses (course_management)
app.get('/courses', (req, res) => {
    const query = 'SELECT * FROM courses';
    courseDb.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/courses', (req, res) => {
    const { name, code, description, credits } = req.body;
    const query = 'INSERT INTO courses (name, code, description, credits) VALUES (?, ?, ?, ?)';
    courseDb.query(query, [name, code, description, credits], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId });
    });
});

app.put('/courses/:id', (req, res) => {
    const { id } = req.params;
    const { name, code, description, credits } = req.body;
    const query = 'UPDATE courses SET name = ?, code = ?, description = ?, credits = ? WHERE id = ?';
    courseDb.query(query, [name, code, description, credits, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.sendStatus(200);
    });
});

app.delete('/courses/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM courses WHERE id = ?';
    courseDb.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.sendStatus(200);
    });
});

/// Routes for Class Schedules (class_management)
app.get('/class_management', (req, res) => {
    const query = 'SELECT * FROM class_schedules';
    classDb.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/class_management', (req, res) => {
    const { class_name, day, time, teacher } = req.body;
    const query = 'INSERT INTO class_schedules (class_name, day, time, teacher) VALUES (?, ?, ?, ?)';
    classDb.query(query, [class_name, day, time, teacher], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId });
    });
});

app.put('/class_management/:id', (req, res) => {
    const { id } = req.params;
    const { class_name, day, time, teacher } = req.body;
    const query = 'UPDATE class_schedules SET class_name = ?, day = ?, time = ?, teacher = ? WHERE id = ?';
    classDb.query(query, [class_name, day, time, teacher, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.sendStatus(200);
    });
});

app.delete('/class_management/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM class_schedules WHERE id = ?';
    classDb.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.sendStatus(200);
    });
});


// Routes for Exams (exam_management)
app.get('/exam_management', (req, res) => {
    examDb.query('SELECT * FROM exam', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/exam_management/:id', (req, res) => {
    const { id } = req.params;
    examDb.query('SELECT * FROM exams WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
});

app.post('/exam_management', (req, res) => {
    const exam = req.body;
    const query = 'INSERT INTO exam (exam_name, date, time, duration, subject, location) VALUES (?, ?, ?, ?, ?, ?)';
    examDb.query(query, [exam.exam_name, exam.date, exam.time, exam.duration, exam.subject, exam.location], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId });
    });
});

app.put('/exam_management/:id', (req, res) => {
    const { id } = req.params;
    const exam = req.body;
    const query = 'UPDATE exam SET exam_name = ?, date = ?, time = ?, duration = ?, subject = ?, location = ? WHERE id = ?';
    examDb.query(query, [exam.exam_name, exam.date, exam.time, exam.duration, exam.subject, exam_location, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.sendStatus(200);
    });
});

app.delete('/exam_management/:id', (req, res) => {
    const { id } = req.params;
    examDb.query('DELETE FROM exams WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.sendStatus(200);
    });
});

// Routes for Subjects (result_management)
// Routes for StudentsInfo (result_management)
app.get('/studentsinfo', (req, res) => {
    const query = 'SELECT * FROM studentsinfo';
    resultDb.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/studentsinfo/:id', (req, res) => {
    const query = 'SELECT * FROM studentsinfo WHERE id = ?';
    resultDb.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Student info not found' });
        res.json(results[0]);
    });
});

app.post('/studentsinfo', (req, res) => {
    const { name, course, semester, seat_number, photo } = req.body;
    const query = 'INSERT INTO studentsinfo (name, course, semester, seat_number, photo) VALUES (?, ?, ?, ?, ?)';
    resultDb.query(query, [name, course, semester, seat_number, photo], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Student info added successfully', id: result.insertId });
    });
});

app.put('/studentsinfo/:id', (req, res) => {
    const { name, course, semester, seat_number, photo } = req.body;
    const query = 'UPDATE studentsinfo SET name = ?, course = ?, semester = ?, seat_number = ?, photo = ? WHERE id = ?';
    resultDb.query(query, [name, course, semester, seat_number, photo, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.sendStatus(200);
    });
});

app.delete('/studentsinfo/:id', (req, res) => {
    const query = 'DELETE FROM studentsinfo WHERE id = ?';
    resultDb.query(query, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.sendStatus(200);
    });
});

app.get('/subjects', (req, res) => {
    const query = 'SELECT * FROM subjects';
    resultDb.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/subjects/:id', (req, res) => {
    const query = 'SELECT * FROM subjects WHERE id = ?';
    resultDb.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Subject not found' });
        res.json(results[0]);
    });
});

app.post('/subjects', (req, res) => {
    const { student_id, code, title, credits, theory, internal, total, grade, earned, points, cxg } = req.body;
    const query = 'INSERT INTO subjects (student_id, code, title, credits, theory, internal, total, grade, earned, points, cxg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    resultDb.query(query, [student_id, code, title, credits, theory, internal, total, grade, earned, points, cxg], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Subject added successfully', id: result.insertId });
    });
});

app.put('/subjects/:id', (req, res) => {
    const { code, title, credits, theory, internal, total, grade, earned, points, cxg } = req.body;
    const query = 'UPDATE subjects SET code = ?, title = ?, credits = ?, theory = ?, internal = ?, total = ?, grade = ?, earned = ?, points = ?, cxg = ? WHERE id = ?';
    resultDb.query(query, [code, title, credits, theory, internal, total, grade, earned, points, cxg, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.sendStatus(200);
    });
});

app.delete('/subjects/:id', (req, res) => {
    const query = 'DELETE FROM subjects WHERE id = ?';
    resultDb.query(query, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.sendStatus(200);
    });
});
// Route for fetching all results
app.get('/results', (req, res) => {
    const query = 'SELECT * FROM resultstudent';
    resultDb.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching results:', err);
            return res.status(500).json({ error: 'Failed to fetch results' });
        }
        res.json(results);
    });
});



// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${8081}`);
});
