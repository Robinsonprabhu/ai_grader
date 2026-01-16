import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import StudentLogin from './pages/StudentLogin';
import TeacherLogin from './pages/TeacherLogin';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import SubmissionPage from './pages/SubmissionPage';
import ModelAnswerSubmissionPage from './pages/ModelAnswerSubmissionPage';
import ShadowValidationPage from './pages/ShadowValidationPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [pageData, setPageData] = useState(null);
  const [studentSubmissions, setStudentSubmissions] = useState([]);
  const [modelAnswers, setModelAnswers] = useState([]);

  const navigate = (page, data = null) => {
    setCurrentPage(page);
    setPageData(data);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    if (userData.role === 'student') {
      navigate('student-dashboard');
    } else {
      navigate('teacher-dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
    setPageData(null);
  };

  const handleSubmitAnswer = (submission) => {
    setStudentSubmissions((prev) => [submission, ...prev]);
  };

  const handleSubmitModelAnswer = (modelAnswer) => {
    setModelAnswers((prev) => [modelAnswer, ...prev]);
  };

  return (
    <div className="app">
      {user && <Header user={user} onLogout={handleLogout} />}

      <main className="app-main">
        {currentPage === 'home' && <Home onNavigate={navigate} />}
        {currentPage === 'student-login' && (
          <StudentLogin onLogin={handleLogin} onNavigate={navigate} />
        )}
        {currentPage === 'teacher-login' && (
          <TeacherLogin onLogin={handleLogin} onNavigate={navigate} />
        )}
        {currentPage === 'student-dashboard' && user && (
          <StudentDashboard
            onNavigate={navigate}
            submissions={studentSubmissions}
            user={user}
          />
        )}
        {currentPage === 'teacher-dashboard' && user && (
          <TeacherDashboard
            onNavigate={navigate}
            modelAnswers={modelAnswers}
            studentSubmissions={studentSubmissions}
            user={user}
          />
        )}
        {currentPage === 'submission' && user && (
          <SubmissionPage onNavigate={navigate} onSubmit={handleSubmitAnswer} />
        )}
        {currentPage === 'model-answer' && user && (
          <ModelAnswerSubmissionPage
            onNavigate={navigate}
            onSubmit={handleSubmitModelAnswer}
          />
        )}
        {currentPage === 'shadow-validation' && (
          <ShadowValidationPage
            onNavigate={navigate}
            submission={pageData?.submission}
            modelAnswerId={pageData?.modelAnswerId}
          />
        )}
      </main>

      {user && <Footer />}
    </div>
  );
}
