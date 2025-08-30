import React, { useState } from 'react';
import { Header } from '../../components/before/Header';
import { UserProfile } from '../../components/before/UserProfile';
import { ThemeToggle } from '../../components/before/ThemeToggle';

interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

type Theme = 'light' | 'dark';

export function BeforeExample() {
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    isLoggedIn: false,
  });
  const [theme, setTheme] = useState<Theme>('light');

  const handleLogin = (userData: Omit<User, 'isLoggedIn'>) => {
    setUser({
      ...userData,
      isLoggedIn: true,
    });
  };

  const handleLogout = () => {
    setUser({
      id: '',
      name: '',
      email: '',
      isLoggedIn: false,
    });
  };

  const handleUpdateProfile = (profileData: Partial<Omit<User, 'id' | 'isLoggedIn'>>) => {
    setUser(prev => ({
      ...prev,
      ...profileData,
    }));
  };

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

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
      <Header 
        user={user} 
        theme={theme} 
        onLogout={handleLogout} 
        onToggleTheme={handleToggleTheme} 
      />
      <div style={contentStyle}>
        <h2>Context Module Pattern 사용 전</h2>
        <p style={{ marginBottom: '20px', color: theme === 'light' ? '#666' : '#ccc' }}>
          이 예제는 Context를 사용하지 않고 props를 통해 상태를 전달하는 방식입니다.
          각 컴포넌트는 필요한 상태와 함수들을 props로 받아야 합니다.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <UserProfile 
              user={user}
              onLogin={handleLogin}
              onLogout={handleLogout}
              onUpdateProfile={handleUpdateProfile}
            />
          </div>
          <div>
            <ThemeToggle 
              theme={theme}
              onToggleTheme={handleToggleTheme}
            />
          </div>
        </div>

        <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>문제점</h3>
          <ul style={{ lineHeight: '1.6' }}>
            <li>Props drilling: 상태를 여러 레벨의 컴포넌트를 거쳐 전달해야 함</li>
            <li>컴포넌트 간 강한 결합: 부모 컴포넌트가 모든 상태를 관리해야 함</li>
            <li>재사용성 저하: 다른 곳에서 사용하려면 동일한 props 구조가 필요</li>
            <li>유지보수 어려움: 상태 변경 시 여러 컴포넌트를 수정해야 함</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
