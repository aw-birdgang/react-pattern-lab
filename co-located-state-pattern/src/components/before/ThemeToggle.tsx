import React from 'react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <div className="theme-toggle">
      <h3>Theme Toggle (Before - Centralized State)</h3>
      <div className="toggle-container">
        <span>Current theme: {isDark ? 'Dark' : 'Light'}</span>
        <button onClick={onToggle}>
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
