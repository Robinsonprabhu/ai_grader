import LoginForm from '../components/LoginForm';

export default function TeacherLogin({ onLogin, onNavigate }) {
  const handleSubmit = (data) => {
    onLogin(data);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Teacher Login</h1>
          <p>Manage model answers and validate submissions</p>
        </div>

        <LoginForm role="teacher" onSubmit={handleSubmit} />

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
