import React, { useState } from 'react';

const LocalStorageExample: React.FC = () => {
  // 각 컴포넌트마다 중복되는 LocalStorage 로직
  const [theme, setTheme] = useState(() => {
    try {
      const item = localStorage.getItem('theme');
      return item ? JSON.parse(item) : 'light';
    } catch (error) {
      return 'light';
    }
  });

  const [userPreferences, setUserPreferences] = useState(() => {
    try {
      const item = localStorage.getItem('userPreferences');
      return item ? JSON.parse(item) : {
        language: 'ko',
        notifications: true,
        fontSize: 'medium'
      };
    } catch (error) {
      return {
        language: 'ko',
        notifications: true,
        fontSize: 'medium'
      };
    }
  });

  const updateTheme = (newTheme: string) => {
    try {
      setTheme(newTheme);
      localStorage.setItem('theme', JSON.stringify(newTheme));
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const updatePreferences = (key: string, value: any) => {
    try {
      const newPreferences = { ...userPreferences, [key]: value };
      setUserPreferences(newPreferences);
      localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  const toggleTheme = () => {
    updateTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="example-container">
      <h2>LocalStorage 예제 (Before)</h2>
      <p>Custom Hook을 사용하지 않은 원본 구현</p>
      
      <div className="localStorage-example">
        <div className="theme-section">
          <h4>테마 설정</h4>
          <p>현재 테마: <strong>{theme}</strong></p>
          <button onClick={toggleTheme}>
            테마 변경 ({theme === 'light' ? '다크' : '라이트'})
          </button>
        </div>

        <div className="preferences-section">
          <h4>사용자 설정</h4>
          <div className="preference-item">
            <label>
              언어:
              <select 
                value={userPreferences.language}
                onChange={(e) => updatePreferences('language', e.target.value)}
              >
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
              </select>
            </label>
          </div>

          <div className="preference-item">
            <label>
              알림:
              <input
                type="checkbox"
                checked={userPreferences.notifications}
                onChange={(e) => updatePreferences('notifications', e.target.checked)}
              />
            </label>
          </div>

          <div className="current-preferences">
            <h5>현재 설정:</h5>
            <pre>{JSON.stringify(userPreferences, null, 2)}</pre>
          </div>
        </div>
      </div>

      <div className="code-section">
        <h4>Before: Custom Hook 없음</h4>
        <pre>
{`// 각 컴포넌트마다 중복되는 LocalStorage 로직
const [theme, setTheme] = useState(() => {
  try {
    const item = localStorage.getItem('theme');
    return item ? JSON.parse(item) : 'light';
  } catch (error) {
    return 'light';
  }
});

const updateTheme = (newTheme) => {
  try {
    setTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

// 문제점:
// ❌ 각 컴포넌트마다 중복되는 LocalStorage 로직
// ❌ 에러 처리 로직이 반복됨
// ❌ 재사용이 어려움
// ❌ 코드가 길고 복잡함`}
        </pre>
      </div>
    </div>
  );
};

export default LocalStorageExample;
