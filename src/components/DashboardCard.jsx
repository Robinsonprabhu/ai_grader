import RiskBadge from './RiskBadge';

export default function DashboardCard({
  id,
  question,
  answer,
  riskLevel,
  riskScore,
  relevanceScore,
  timestamp,
  userRole,
  onView,
  onDelete,
}) {
  const formattedTime = new Date(timestamp).toLocaleString();

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div className="card-meta">
          <span className="card-id">{id}</span>
          <span className="card-time">{formattedTime}</span>
        </div>
        <RiskBadge level={riskLevel} score={riskScore} />
      </div>

      <div className="card-body">
        <div className="card-section">
          <p className="section-label">Question:</p>
          <p className="card-text">{question.substring(0, 150)}...</p>
        </div>

        <div className="card-section">
          <p className="section-label">Answer Preview:</p>
          <p className="card-text">{answer.substring(0, 150)}...</p>
        </div>

        {relevanceScore && (
          <div className="card-stats">
            <div className="stat-item">
              <span className="stat-label">Relevance</span>
              <span className="stat-value">{relevanceScore}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Risk Score</span>
              <span className="stat-value">{riskScore}%</span>
            </div>
          </div>
        )}
      </div>

      <div className="card-footer">
        <button className="btn btn-secondary" onClick={() => onView(id)}>
          View Details
        </button>
        {onDelete && (
          <button className="btn btn-danger" onClick={() => onDelete(id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
