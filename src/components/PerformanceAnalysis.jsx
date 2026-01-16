export default function PerformanceAnalysis({ analysis, modelAnswer }) {
  const accuracyScore = analysis.relevanceScore || 0;
  const coverageScore = Math.min(100, (analysis.answerLength / 300) * 100);
  const securityScore = 100 - analysis.riskScore;
  const overallScore = Math.round((accuracyScore + coverageScore + securityScore) / 3);

  return (
    <div className="performance-section">
      <div className="performance-content">
        <h2 className="performance-title">Performance Analysis</h2>
        <div className="performance-grid">
          <div className="perf-metric">
            <div className="perf-label">Overall Score</div>
            <div className="perf-value">{overallScore}%</div>
            <div className="perf-change">
              {overallScore >= 75 ? '📈 Excellent' : overallScore >= 50 ? '→ Good' : '📉 Needs Work'}
            </div>
          </div>

          <div className="perf-metric">
            <div className="perf-label">Accuracy</div>
            <div className="perf-value">{accuracyScore}%</div>
            <div className="perf-change">
              Match with model answer
            </div>
          </div>

          <div className="perf-metric">
            <div className="perf-label">Coverage</div>
            <div className="perf-value">{Math.round(coverageScore)}%</div>
            <div className="perf-change">
              Answer completeness
            </div>
          </div>

          <div className="perf-metric">
            <div className="perf-label">Security</div>
            <div className="perf-value">{securityScore}%</div>
            <div className="perf-change">
              Safety score
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
