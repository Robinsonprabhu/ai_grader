export default function Home({ onNavigate }) {
  return (
    <div className="home-page">
      <div className="home-container">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">AI Safety & Reliability Demo</h1>
            <p className="hero-subtitle">
              Evaluate student answers with AI-powered shadow validation
            </p>
            <p className="hero-description">
              This platform demonstrates how AI systems can detect and analyze answer quality,
              reliability, and security risks in real-time.
            </p>
          </div>
        </div>

        <div className="login-options">
          <div className="option-card student-card">
            <div className="option-icon">👤</div>
            <h2>Student</h2>
            <p>Submit answers and view feedback with risk analysis</p>
            <button
              className="btn btn-primary btn-large"
              onClick={() => onNavigate('student-login')}
            >
              Student Login
            </button>
          </div>

          <div className="option-card teacher-card">
            <div className="option-icon">👨‍🏫</div>
            <h2>Teacher</h2>
            <p>Submit model answers and validate student submissions</p>
            <button
              className="btn btn-primary btn-large"
              onClick={() => onNavigate('teacher-login')}
            >
              Teacher Login
            </button>
          </div>
        </div>

        <div className="features-section">
          <h2 className="features-title">Key Features</h2>
          <div className="features-grid">
            <div className="feature">
              <span className="feature-icon">🔍</span>
              <h3>Shadow Validation</h3>
              <p>AI analyzes answers in real-time with detailed logs</p>
            </div>
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <h3>Risk Detection</h3>
              <p>Detects security patterns and potential issues</p>
            </div>
            <div className="feature">
              <span className="feature-icon">📊</span>
              <h3>Relevance Scoring</h3>
              <p>Measures answer quality and relevance</p>
            </div>
            <div className="feature">
              <span className="feature-icon">📋</span>
              <h3>Validation Logs</h3>
              <p>Complete transparency with detailed analysis logs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
