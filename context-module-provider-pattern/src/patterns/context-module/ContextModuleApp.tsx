import React from 'react';
import { UserProvider } from './UserContext';
import { ThemeProvider, useTheme } from './ThemeContext';
import { Header } from './Header';
import { UserProfile } from './UserProfile';
import { ThemeToggle } from './ThemeToggle';

function AppContent() {
  const { theme } = useTheme();

  const containerStyle = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a',
    color: theme === 'light' ? '#333333' : '#ffffff',
    minHeight: '100vh',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  const contentStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  return (
    <div style={containerStyle}>
      <Header />
      <div style={contentStyle}>
        <h2>Context Module Pattern (After)</h2>
        <p style={{ marginBottom: '20px', color: theme === 'light' ? '#666' : '#ccc' }}>
          이 예제는 Context Module Pattern을 사용하여 전역 상태를 관리하는 방식입니다.
          각 컴포넌트는 필요한 상태와 함수들을 직접 Context에서 가져옵니다.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <UserProfile />
          </div>
          <div>
            <ThemeToggle />
          </div>
        </div>

        <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Context Module Pattern의 장점</h3>
          <ul style={{ lineHeight: '1.6' }}>
            <li><strong>Props Drilling 해결:</strong> Context를 통해 직접 상태에 접근 가능</li>
            <li><strong>컴포넌트 간 느슨한 결합:</strong> 각 컴포넌트가 독립적으로 상태 사용</li>
            <li><strong>재사용성 향상:</strong> Provider로 감싸기만 하면 어디서든 사용 가능</li>
            <li><strong>유지보수 용이:</strong> 상태 로직이 Context에 집중되어 관리 편리</li>
            <li><strong>타입 안전성:</strong> TypeScript와 함께 사용하여 타입 안전성 보장</li>
            <li><strong>코드 가독성:</strong> 컴포넌트가 필요한 상태만 명확하게 사용</li>
          </ul>
        </div>

        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#d1ecf1' }}>
          <h3>코드 구조 분석</h3>
          <pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`// Context Module 정의
export function UserProvider({ children }) {
  const [user, dispatch] = useReducer(userReducer, initialState);
  
  const value = {
    user,
    login,
    logout,
    updateProfile,
  };
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// 컴포넌트에서 직접 사용
export function UserProfile() {
  const { user, login, logout, updateProfile } = useUser();
  // 필요한 상태와 함수만 가져와서 사용
}

// Provider로 감싸기만 하면 어디서든 사용 가능
<UserProvider>
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
</UserProvider>`}
          </pre>
        </div>

        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#d4edda' }}>
          <h3>패턴 비교</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>구분</th>
                <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Props Drilling</th>
                <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left' }}>Context Module</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>상태 전달</td>
                <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>Props로 수동 전달</td>
                <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>Context로 자동 접근</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>컴포넌트 결합도</td>
                <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>높음 (강한 결합)</td>
                <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>낮음 (느슨한 결합)</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>재사용성</td>
                <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>낮음</td>
                <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>높음</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>유지보수성</td>
                <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>어려움</td>
                <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>쉬움</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function ContextModuleApp() {
  return (
    <UserProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </UserProvider>
  );
}
