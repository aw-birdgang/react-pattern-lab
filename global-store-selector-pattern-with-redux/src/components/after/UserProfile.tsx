import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectCurrentUser,
  selectUserDisplayInfo
} from '../../store/selectors/userSelectors';
import { updateUserPreferences, logout } from '../../store/slices/userSlice';

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const userDisplayInfo = useAppSelector(selectUserDisplayInfo);

  const handleThemeChange = (theme: 'light' | 'dark') => {
    dispatch(updateUserPreferences({ theme }));
  };

  const handleLanguageChange = (language: 'ko' | 'en') => {
    dispatch(updateUserPreferences({ language }));
  };

  const handleNotificationChange = (notifications: boolean) => {
    dispatch(updateUserPreferences({ notifications }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!currentUser) {
    return (
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>사용자 프로필 (Redux + Selectors)</h2>
        <p>로그인이 필요합니다.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>사용자 프로필 (Redux + Selectors)</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>기본 정보</h3>
        <p><strong>이름:</strong> {currentUser.name}</p>
        <p><strong>이메일:</strong> {currentUser.email}</p>
        <p><strong>역할:</strong> {currentUser.role}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>설정</h3>

        <div style={{ marginBottom: '10px' }}>
          <label>
            <strong>테마:</strong>
            <select
              value={currentUser.preferences.theme}
              onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark')}
              style={{ marginLeft: '10px' }}
            >
              <option value="light">라이트</option>
              <option value="dark">다크</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            <strong>언어:</strong>
            <select
              value={currentUser.preferences.language}
              onChange={(e) => handleLanguageChange(e.target.value as 'ko' | 'en')}
              style={{ marginLeft: '10px' }}
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={currentUser.preferences.notifications}
              onChange={(e) => handleNotificationChange(e.target.checked)}
              style={{ marginRight: '10px' }}
            />
            <strong>알림 받기</strong>
          </label>
        </div>
      </div>

      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        로그아웃
      </button>
    </div>
  );
};

export default UserProfile;
