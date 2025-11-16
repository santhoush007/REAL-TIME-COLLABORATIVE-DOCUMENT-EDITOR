import React from 'react';
import './Header.css';

const Header = ({ activeUsers }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <h1>📝 Collab Editor</h1>
        </div>
        <div className="active-users">
          <span className="users-label">Active Users:</span>
          <div className="user-avatars">
            {activeUsers && activeUsers.length > 0 ? (
              activeUsers.map((user, index) => (
                <div
                  key={index}
                  className="user-avatar"
                  title={user}
                >
                  {user.charAt(0).toUpperCase()}
                </div>
              ))
            ) : (
              <span className="no-users">No other users online</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
