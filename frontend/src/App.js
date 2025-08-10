import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddAttendance from './Components/Pages/AddAttendance';
import AddMarks from './Components/Pages/AddMarks';
import AddStudentPage from './Components/Pages/AddStudentPage';
import AddTeacherPage from './Components/Pages/AddTeacherPage';
import AdminDashboard from './Components/Pages/AdminDashboard';
import AdminSidebar from './Components/Pages/AdminSidebar';
import ClassSchedule from './Components/Pages/ClassSchedule';
import CourseListPage from './Components/Pages/CourseListPage';
import CourseMaterials from './Components/Pages/CourseMaterials';
import CoursePage from './Components/Pages/CoursePage';
import EditStudentPage from './Components/Pages/EditStudentPage';
import EditTeacherPage from './Components/Pages/EditTeacherPage';
import ExamSchedule from './Components/Pages/ExamSchedule';
import GenerateGradeCardForm from './Components/Pages/GenerateGradeCardForm';
import ListMarks from './Components/Pages/ListMarks';
import Main from './Components/Pages/Main';
import ManageStudentsPage from './Components/Pages/ManageStudentPage';
import ManageReportPage from './Components/Pages/ManageStudentReport';
import ManageTeachersPage from './Components/Pages/ManageTeacherPage';
import MyCourse from './Components/Pages/MyCourse';
import Profile from './Components/Pages/Profile';
import Setting1 from './Components/Pages/Setting1';
import Settings from './Components/Pages/Settings';
import SettingsPage from './Components/Pages/SettingsPage';
import Signup from './Components/Pages/Signup';
import StudentAttendance from './Components/Pages/StudentAttendance';
import { StudentProvider } from './Components/Pages/StudentContext';
import StudentPage from './Components/Pages/StudentPage';
import StudentReport from './Components/Pages/StudentReport';
import StudentSidebar from './Components/Pages/StudentSidebar';
import TeacherProfile from './Components/Pages/TeacherProfile';
import TeacherSidebar from './Components/Pages/TeacherSidebar';
import UpdateMarks from './Components/Pages/UpdateMarks';
import TeacherAddCourse from './Components/Pages/TeacherAddCourse';

const App = () => {
  return (
    <StudentProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/AdminSidebar' element={<AdminSidebar />} />
          <Route path='/TeacherSidebar' element={<TeacherSidebar />} />
          <Route path='/StudentSidebar' element={<StudentSidebar />} />
          <Route path='/ManageStudentPage' element={<ManageStudentsPage />} />
          <Route path='/ManageTeacherPage' element={<ManageTeachersPage />} />
          <Route path='/CoursePage' element={<CoursePage />} />
          <Route path='/CourseListPage' element={<CourseListPage />} />
          <Route path='/AddStudent' element={<AddStudentPage />} />
          <Route path='/AddTeacher' element={<AddTeacherPage />} />
          <Route path='/StudentReport' element={<StudentReport />} />
          <Route path='/ClassSchedule' element={<ClassSchedule />} />
          <Route path='/ExamSchedule' element={<ExamSchedule />} />
          <Route path='/AdminDashboard' element={<AdminDashboard />} />
          <Route path='/Settings' element={<Settings />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/AddMarks' element={<AddMarks />} />
          <Route path="/update-marks/:id" element={<UpdateMarks />} />
          <Route path='/ListMarks' element={<ListMarks />} />
          <Route path='/AddAttendance' element={<AddAttendance />} />
          <Route path='/StudentPage' element={<StudentPage />} />
          <Route path='/SettingsPage' element={<SettingsPage />} />
          <Route path='/EditStudent/:id' element={<EditStudentPage />} />
          <Route path='/ManageReportPage' element={<ManageReportPage />} />
          <Route path="/CourseMaterials" element={<CourseMaterials />} />
          <Route path='/MyCourse' element={<MyCourse />} />
          <Route path="/StudentAttendance" element={<StudentAttendance />} />
          <Route path='/StudentSetting' element={<Setting1 />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path="/Result" element={<GenerateGradeCardForm />} />
          <Route path="/TeacherProfile" element={<TeacherProfile />} />
          <Route path="/EditTeacher/:id" element={<EditTeacherPage />} />
          <Route path="/TeacherAddCourse" element={<TeacherAddCourse/>}/>

        </Routes>
      </Router>
    </StudentProvider>
  );
};

export default App;
