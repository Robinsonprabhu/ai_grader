export default function RiskBadge({ level, score }) {
  const colorClass = level === 'Safe' ? 'green' : level === 'Suspicious' ? 'yellow' : 'red';

  return (
    <div className={`risk-badge risk-badge-${colorClass}`}>
      <span className="badge-dot"></span>
      <span className="badge-text">{level}</span>
      {score !== undefined && <span className="badge-score">{score}%</span>}
    </div>
  );
}
