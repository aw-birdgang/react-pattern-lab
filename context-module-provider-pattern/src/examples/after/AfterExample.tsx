import React from 'react';
import { UserProvider, ThemeProvider } from '../../contexts';
import { Header } from '../../components/after/Header';
import { UserProfile } from '../../components/after/UserProfile';
import { ThemeToggle } from '../../components/after/ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';

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
        <h2>Context Module Pattern 사용 후</h2>
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
          <h3>장점</h3>
          <ul style={{ lineHeight: '1.6' }}>
            <li>Props drilling 해결: Context를 통해 직접 상태에 접근 가능</li>
            <li>컴포넌트 간 느슨한 결합: 각 컴포넌트가 독립적으로 상태 사용</li>
            <li>재사용성 향상: Provider로 감싸기만 하면 어디서든 사용 가능</li>
            <li>유지보수 용이: 상태 로직이 Context에 집중되어 관리 편리</li>
            <li>타입 안전성: TypeScript와 함께 사용하여 타입 안전성 보장</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function AfterExample() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}
