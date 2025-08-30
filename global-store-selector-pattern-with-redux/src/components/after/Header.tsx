import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { 
  selectCurrentUser, 
  selectIsLoggedIn,
  selectUserDisplayInfo 
} from '../../store/selectors/userSelectors';
import { selectThemeMode } from '../../store/selectors/themeSelectors';
import { selectUnreadCount } from '../../store/selectors/notificationSelectors';
import { toggleTheme } from '../../store/slices/themeSlice';
import { logout } from '../../store/slices/userSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const userDisplayInfo = useAppSelector(selectUserDisplayInfo);
  const themeMode = useAppSelector(selectThemeMode);
  const unreadCount = useAppSelector(selectUnreadCount);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header style={{ 
      padding: '15px 20px', 
      backgroundColor: themeMode === 'dark' ? '#333' : '#f8f9fa',
      color: themeMode === 'dark' ? 'white' : 'black',
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
          Redux + Selectors 패턴
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {/* 테마 토글 버튼 */}
        <button
          onClick={handleToggleTheme}
          style={{
            padding: '8px 12px',
            backgroundColor: themeMode === 'dark' ? '#fff' : '#333',
            color: themeMode === 'dark' ? '#333' : '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {themeMode === 'dark' ? '☀️ 라이트' : '🌙 다크'}
        </button>

        {/* 알림 아이콘 */}
        <div style={{ position: 'relative' }}>
          <span style={{ fontSize: '20px' }}>🔔</span>
          {unreadCount > 0 && (
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
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </div>

        {/* 사용자 정보 */}
        {isLoggedIn && currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {currentUser.avatar && (
              <img 
                src={currentUser.avatar} 
                alt="프로필" 
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%' 
                }}
              />
            )}
            <div>
              <div style={{ fontWeight: 'bold' }}>{currentUser.name}</div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>
                {currentUser.role === 'admin' ? '관리자' : currentUser.role === 'user' ? '사용자' : '게스트'}
              </div>
            </div>
            <button
              onClick={handleLogout}
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
