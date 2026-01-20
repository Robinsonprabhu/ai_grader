import DashboardCard from '../components/DashboardCard';
import PersonalizedExamInfo from '../components/PersonalizedExamInfo';

const sampleQuestions = [
  'Explain what machine learning is and provide examples.',
  'Describe the difference between supervised and unsupervised learning.',
  'What is neural network and usage of it.how does it work?',
  'Explain the concept of overfitting in machine learning.',
];

export default function TeacherDashboard({
  onNavigate,
  modelAnswers = [],
  studentSubmissions = [],
  user,
}) {
  const handleViewModelAnswer = (id) => {
    const modelAnswer = modelAnswers.find((m) => m.id === id);
    if (modelAnswer) {
      onNavigate('shadow-validation', {
        submission: {
          ...modelAnswer,
          answer: modelAnswer.modelAnswer,
        },
      });
    }
  };

  const handleViewStudentSubmission = (id) => {
    const submission = studentSubmissions.find((s) => s.id === id);
    if (submission) {
      onNavigate('shadow-validation', { submission });
    }
  };

  return (
    <div className="dashboard-page">
      <PersonalizedExamInfo
        user={user}
        submissionCount={modelAnswers.length}
        modelAnswerCount={modelAnswers.length}
      />

      <div className="dashboard-tabs">
        <div className="tabs-header">
          <h1>Exam Management</h1>
          <div className="tabs-buttons">
            <button className="btn btn-primary" onClick={() => onNavigate('model-answer')}>
              + Submit Model Answer
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2 className="section-title">Model Answers</h2>
          {modelAnswers && modelAnswers.length > 0 ? (
            <div className="submissions-grid">
              {modelAnswers.map((answer) => (
                <DashboardCard
                  key={answer.id}
                  id={answer.id}
                  question={answer.question}
                  answer={answer.modelAnswer}
                  riskLevel={answer.analysis.riskLevel}
                  riskScore={answer.analysis.riskScore}
                  timestamp={answer.timestamp}
                  onView={handleViewModelAnswer}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No model answers submitted yet</p>
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">Student Submissions for Review</h2>
          {studentSubmissions && studentSubmissions.length > 0 ? (
            <div className="submissions-grid">
              {studentSubmissions.map((submission) => (
                <DashboardCard
                  key={submission.id}
                  id={submission.id}
                  question={submission.question}
                  answer={submission.answer}
                  riskLevel={submission.analysis.riskLevel}
                  riskScore={submission.analysis.riskScore}
                  relevanceScore={submission.analysis.relevanceScore}
                  timestamp={submission.timestamp}
                  onView={handleViewStudentSubmission}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No student submissions to review yet</p>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-info">
        <h2>Available Questions</h2>
        <ul className="questions-list">
          {sampleQuestions.map((q, idx) => (
            <li key={idx}>{q}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
