import DashboardCard from '../components/DashboardCard';
import PersonalizedExamInfo from '../components/PersonalizedExamInfo';

const sampleQuestions = [
  'Explain what machine learning is and provide examples.',
  'Describe the difference between supervised and unsupervised learning.',
  'What is neural network and usage of it.how does it work?',
  'Explain the concept of overfitting in machine learning.',
];

export default function StudentDashboard({ onNavigate, submissions = [], user }) {
  const handleViewDetails = (submissionId) => {
    const submission = submissions.find((s) => s.id === submissionId);
    if (submission) {
      onNavigate('shadow-validation', { submission });
    }
  };

  const handleDeleteSubmission = (submissionId) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      // Delete logic would go here
    }
  };

  return (
    <div className="dashboard-page">
      <PersonalizedExamInfo user={user} submissionCount={submissions.length} />

      <div className="dashboard-header">
        <h1>My Submissions</h1>
        <button
          className="btn btn-primary"
          onClick={() => onNavigate('submission')}
        >
          + Submit New Answer
        </button>
      </div>

      <div className="dashboard-content">
        {submissions && submissions.length > 0 ? (
          <div className="submissions-grid">
            {submissions.map((submission) => (
              <DashboardCard
                key={submission.id}
                id={submission.id}
                question={submission.question}
                answer={submission.answer}
                riskLevel={submission.analysis.riskLevel}
                riskScore={submission.analysis.riskScore}
                relevanceScore={submission.analysis.relevanceScore}
                timestamp={submission.timestamp}
                onView={handleViewDetails}
                onDelete={handleDeleteSubmission}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h2>No Submissions Yet</h2>
            <p>Start by submitting your first answer to see the AI analysis</p>
            <button
              className="btn btn-primary"
              onClick={() => onNavigate('submission')}
            >
              Submit Your First Answer
            </button>
          </div>
        )}
      </div>

      <div className="dashboard-info">
        <h2>Questions Available</h2>
        <ul className="questions-list">
          {sampleQuestions.map((q, idx) => (
            <li key={idx}>{q}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
