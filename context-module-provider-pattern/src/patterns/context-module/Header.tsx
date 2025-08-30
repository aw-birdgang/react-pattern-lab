import React from 'react';
import { useUser } from './UserContext';
import { useTheme } from './ThemeContext';

export function Header() {
  const { user, logout } = useUser();
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{ 
      padding: '20px', 
      backgroundColor: theme === 'light' ? '#f8f9fa' : '#343a40',
      color: theme === 'light' ? '#333' : '#fff',
      borderBottom: '1px solid #dee2e6',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h1 style={{ margin: 0 }}>Context Module Pattern</h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
          {user.isLoggedIn ? `안녕하세요, ${user.name}님!` : '로그인이 필요합니다'}
        </p>
      </div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button 
          onClick={toggleTheme}
          style={{ 
            padding: '6px 12px', 
            backgroundColor: theme === 'light' ? '#333' : '#fff',
            color: theme === 'light' ? '#fff' : '#333',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        {user.isLoggedIn && (
          <button 
            onClick={logout}
            style={{ 
              padding: '6px 12px', 
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            로그아웃
          </button>
        )}
      </div>
    </header>
  );
}
