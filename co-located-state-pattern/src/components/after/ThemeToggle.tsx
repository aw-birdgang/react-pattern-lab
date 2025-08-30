import React, { useState } from 'react';

const ThemeToggle: React.FC = () => {
  // 상태가 컴포넌트 내부에 지역화됨
  const [isDark, setIsDark] = useState(false);

  const handleToggle = () => {
    setIsDark(prev => !prev);
  };

  return (
    <div className="theme-toggle">
      <h3>Theme Toggle (After - Co-located State)</h3>
      <div className="toggle-container">
        <span>Current theme: {isDark ? 'Dark' : 'Light'}</span>
        <button onClick={handleToggle}>
          Switch to {isDark ? 'Light' : 'Dark'} Mode
        </button>
      </div>
      <div 
        className="theme-preview"
        style={{
          backgroundColor: isDark ? '#333' : '#fff',
          color: isDark ? '#fff' : '#333',
          padding: '1rem',
          marginTop: '1rem',
          borderRadius: '4px'
        }}
      >
        This is a preview of the {isDark ? 'dark' : 'light'} theme
      </div>
    </div>
  );
};

export default ThemeToggle;
