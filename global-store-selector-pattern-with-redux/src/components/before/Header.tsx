import React from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark';
    language: 'ko' | 'en';
    notifications: boolean;
  };
}

interface HeaderProps {
  user: User | null;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onLogout: () => void;
  unreadNotifications: number;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  theme, 
  onToggleTheme, 
  onLogout, 
  unreadNotifications 
}) => {
  return (
    <header style={{ 
      padding: '15px 20px', 
      backgroundColor: theme === 'dark' ? '#333' : '#f8f9fa',
      color: theme === 'dark' ? 'white' : 'black',
      borderBottom: '1px solid #dee2e6',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '24px' }}>
          글로벌 스토어 + 셀렉터 패턴 데모
        </h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.7 }}>
          Props Drilling 패턴
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {/* 테마 토글 버튼 */}
        <button
          onClick={onToggleTheme}
          style={{
            padding: '8px 12px',
            backgroundColor: theme === 'dark' ? '#fff' : '#333',
            color: theme === 'dark' ? '#333' : '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {theme === 'dark' ? '☀️ 라이트' : '🌙 다크'}
        </button>

        {/* 알림 아이콘 */}
        <div style={{ position: 'relative' }}>
          <span style={{ fontSize: '20px' }}>🔔</span>
          {unreadNotifications > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: '#dc3545',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {unreadNotifications > 99 ? '99+' : unreadNotifications}
            </span>
          )}
        </div>

        {/* 사용자 정보 */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {user.avatar && (
              <img 
                src={user.avatar} 
                alt="프로필" 
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%' 
                }}
              />
            )}
            <div>
              <div style={{ fontWeight: 'bold' }}>{user.name}</div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>
                {user.role === 'admin' ? '관리자' : user.role === 'user' ? '사용자' : '게스트'}
              </div>
            </div>
            <button
              onClick={onLogout}
              style={{
                padding: '6px 12px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div style={{ fontSize: '14px', opacity: 0.7 }}>
            로그인되지 않음
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
