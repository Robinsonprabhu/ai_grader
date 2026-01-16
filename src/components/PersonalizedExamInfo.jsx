export default function PersonalizedExamInfo({ user, submissionCount, modelAnswerCount }) {
  const examStatus = submissionCount > 0 ? 'In Progress' : 'Not Started';
  const completionRate = Math.round((submissionCount / 4) * 100);

  return (
    <div className="exam-info-section">
      <div className="exam-header">
        <div className="exam-greeting">
          <h2 className="exam-title">Welcome, {user?.name}!</h2>
          <p className="exam-subtitle">{user?.role === 'student' ? 'Student Exam Dashboard' : 'Teacher Dashboard'}</p>
        </div>
        <div className="exam-status">
          <div className="status-badge" style={{
            background: examStatus === 'In Progress' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(107, 114, 128, 0.2)',
            color: examStatus === 'In Progress' ? '#3b82f6' : '#6b7280',
            border: examStatus === 'In Progress' ? '2px solid #3b82f6' : '2px solid #6b7280'
          }}>
            {examStatus}
          </div>
        </div>
      </div>

      <div className="exam-stats">
        <div className="exam-stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <span className="stat-label">Questions Answered</span>
            <span className="stat-value">{submissionCount}/4</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${completionRate}%` }}></div>
          </div>
        </div>

        {user?.role === 'teacher' && (
          <div className="exam-stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <span className="stat-label">Model Answers</span>
              <span className="stat-value">{modelAnswerCount}/4</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(modelAnswerCount / 4) * 100}%` }}></div>
            </div>
          </div>
        )}

        <div className="exam-stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-info">
            <span className="stat-label">Session Time</span>
            <span className="stat-value">Active</span>
          </div>
          <p className="exam-time">Started: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}
