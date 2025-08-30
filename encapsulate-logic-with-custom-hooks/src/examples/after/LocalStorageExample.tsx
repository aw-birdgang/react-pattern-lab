import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const LocalStorageExample: React.FC = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [userPreferences, setUserPreferences] = useLocalStorage('userPreferences', {
    language: 'ko',
    notifications: true,
    fontSize: 'medium'
  });

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const updatePreferences = (key: string, value: any) => {
    setUserPreferences((prev: any) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="example-container">
      <h2>LocalStorage 예제 (After)</h2>
      <p>Custom Hook을 사용한 개선된 구현</p>
      
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
        <h4>After: Custom Hook 사용</h4>
        <pre>
{`// Custom Hook으로 LocalStorage 로직 캡슐화
const [theme, setTheme] = useLocalStorage('theme', 'light');
const [preferences, setPreferences] = useLocalStorage('preferences', {});

// useLocalStorage Hook 내부
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":\`, error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setValue];
};

// 장점:
// ✅ LocalStorage 로직이 Custom Hook으로 캡슐화됨
// ✅ 에러 처리 로직이 통합됨
// ✅ 다른 컴포넌트에서도 쉽게 재사용 가능
// ✅ 코드가 간결해짐`}
        </pre>
      </div>
    </div>
  );
};

export default LocalStorageExample;
