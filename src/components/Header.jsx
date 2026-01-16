export default function Header({ user, onLogout }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon">⚡</div>
          <span className="logo-text">AI Safety Demo</span>
        </div>
        {user && (
          <div className="user-section">
            <span className="user-role">{user.role === 'student' ? '👤 Student' : '👨‍🏫 Teacher'}</span>
            <span className="user-name">{user.name}</span>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
