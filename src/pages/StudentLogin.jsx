import LoginForm from '../components/LoginForm';

export default function StudentLogin({ onLogin, onNavigate }) {
  const handleSubmit = (data) => {
    onLogin(data);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Student Login</h1>
          <p>Access your submissions and feedback</p>
        </div>

        <LoginForm role="student" onSubmit={handleSubmit} />

        <div className="login-footer">
          <button
            className="btn btn-secondary"
            onClick={() => onNavigate('home')}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
