export default function LogCard({ logs, title = 'Validation Log' }) {
  return (
    <div className="log-card">
      <h3 className="log-title">{title}</h3>
      <div className="log-content">
        {logs.map((log, index) => (
          <div key={index} className={`log-entry log-entry-${log.type}`}>
            <div className="log-icon">
              {log.type === 'success' && '✓'}
              {log.type === 'warning' && '⚠'}
              {log.type === 'error' && '✕'}
              {log.type === 'info' && 'ℹ'}
            </div>
            <div className="log-text">
              <p className="log-message">{log.message}</p>
              {log.detail && <p className="log-detail">{log.detail}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
