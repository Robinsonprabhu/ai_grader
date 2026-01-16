import { useState, useEffect } from 'react';
import RiskBadge from '../components/RiskBadge';
import LogCard from '../components/LogCard';
import PerformanceAnalysis from '../components/PerformanceAnalysis';
import LoadingSpinner from '../components/LoadingSpinner';
import { generateValidationLog } from '../utils/riskDetection';

export default function ShadowValidationPage({ onNavigate, submission, modelAnswerId }) {
  const [isValidating, setIsValidating] = useState(true);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      if (submission) {
        const validationLogs = generateValidationLog(submission.analysis);
        setLogs(validationLogs);
      }
      setIsValidating(false);
    }, 2000);
  }, [submission, modelAnswerId]);

  if (isValidating) {
    return (
      <div className="page-container">
        <LoadingSpinner message="Running comprehensive AI safety and reliability analysis..." />
      </div>
    );
  }

  if (!submission && !modelAnswerId) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <p>No submission data available</p>
          <button className="btn btn-secondary" onClick={() => onNavigate('home')}>
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const data = submission;

  return (
    <div className="validation-page">
      <div className="validation-header">
        <button className="btn btn-secondary" onClick={() => onNavigate('home')}>
          ← Dashboard
        </button>
        <h1>Analysis Report</h1>
      </div>

      <div className="validation-container">
        <PerformanceAnalysis analysis={data.analysis} />

        <div className="validation-grid">
          <div className="validation-card">
            <h2 className="card-title">Question</h2>
            <p className="validation-text">{data.question}</p>
          </div>

          <div className="validation-card">
            <h2 className="card-title">Your Answer</h2>
            <p className="validation-text">{data.answer}</p>
          </div>
        </div>

        <div className="results-section">
          <div className="results-grid">
            <div className="result-card">
              <h3 className="result-label">Security Status</h3>
              <RiskBadge level={data.analysis.riskLevel} score={data.analysis.riskScore} />
            </div>

            <div className="result-card">
              <h3 className="result-label">Risk Score</h3>
              <div className="score-bar">
                <div
                  className={`score-fill score-fill-${
                    data.analysis.riskColor === 'red'
                      ? 'danger'
                      : data.analysis.riskColor === 'yellow'
                      ? 'warning'
                      : 'success'
                  }`}
                  style={{ width: `${data.analysis.riskScore}%` }}
                ></div>
              </div>
              <p className="score-text">{data.analysis.riskScore}%</p>
            </div>

            <div className="result-card">
              <h3 className="result-label">Answer Quality</h3>
              <div className="score-bar">
                <div
                  className="score-fill score-fill-info"
                  style={{ width: `${data.analysis.relevanceScore}%` }}
                ></div>
              </div>
              <p className="score-text">{data.analysis.relevanceScore}%</p>
            </div>

            <div className="result-card">
              <h3 className="result-label">Word Count</h3>
              <p className="score-text">{Math.round(data.analysis.answerLength / 5)}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{data.analysis.answerLength} chars</p>
            </div>
          </div>
        </div>

        {data.analysis.triggeredRules && data.analysis.triggeredRules.length > 0 && (
          <div className="threats-section">
            <h2 className="section-title">Security Alerts</h2>
            <div className="threats-grid">
              {data.analysis.triggeredRules.map((rule, idx) => (
                <div key={idx} className="threat-card">
                  <div className="threat-header">
                    <h4 className="threat-name">{rule.name}</h4>
                    <span className="threat-severity">Severity: {rule.severity}%</span>
                  </div>
                  {rule.matches && rule.matches.length > 0 && (
                    <div className="threat-matches">
                      <p className="matches-label">Detected patterns:</p>
                      <div className="matches-list">
                        {rule.matches.map((match, midx) => (
                          <code key={midx} className="match-tag">
                            {match}
                          </code>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <LogCard logs={logs} title="AI Analysis Log" />

        <div className="validation-footer">
          <p className="validation-id">Analysis ID: {data.analysis.validationId}</p>
          <p className="validation-time">
            Timestamp: {new Date(data.analysis.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
