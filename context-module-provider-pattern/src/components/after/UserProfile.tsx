import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';

export function UserProfile() {
  const { user, login, logout, updateProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);

  const handleLogin = () => {
    login({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    });
  };

  const handleLogout = () => {
    logout();
  };

  const handleSave = () => {
    updateProfile({
      name: editName,
      email: editEmail,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setIsEditing(false);
  };

  if (!user.isLoggedIn) {
    return (
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>로그인이 필요합니다</h3>
        <button onClick={handleLogin} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          로그인
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>사용자 프로필</h3>
      {isEditing ? (
        <div>
          <div style={{ marginBottom: '10px' }}>
            <label>이름: </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={{ marginLeft: '10px', padding: '4px 8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>이메일: </label>
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              style={{ marginLeft: '10px', padding: '4px 8px' }}
            />
          </div>
          <div>
            <button onClick={handleSave} style={{ marginRight: '10px', padding: '4px 8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
              저장
            </button>
            <button onClick={handleCancel} style={{ padding: '4px 8px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>
              취소
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>이름:</strong> {user.name}</p>
          <p><strong>이메일:</strong> {user.email}</p>
          <div>
            <button onClick={() => setIsEditing(true)} style={{ marginRight: '10px', padding: '4px 8px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px' }}>
              편집
            </button>
            <button onClick={handleLogout} style={{ padding: '4px 8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
