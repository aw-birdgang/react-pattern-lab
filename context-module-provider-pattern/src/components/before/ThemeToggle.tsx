import React from 'react';

type Theme = 'light' | 'dark';

interface ThemeToggleProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function ThemeToggle({ theme, onToggleTheme }: ThemeToggleProps) {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>테마 설정</h3>
      <p>현재 테마: <strong>{theme === 'light' ? '라이트' : '다크'}</strong></p>
      <button 
        onClick={onToggleTheme}
        style={{ 
          padding: '8px 16px', 
          backgroundColor: theme === 'light' ? '#333' : '#fff',
          color: theme === 'light' ? '#fff' : '#333',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {theme === 'light' ? '다크 모드로 변경' : '라이트 모드로 변경'}
      </button>
    </div>
  );
}
