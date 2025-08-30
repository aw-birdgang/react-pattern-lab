import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface BuggyUserProfileProps {
  userId: number;
  shouldFail?: boolean;
}

const BuggyUserProfile: React.FC<BuggyUserProfileProps> = ({ 
  userId, 
  shouldFail = false 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);

      // 의도적으로 에러를 발생시키거나 실제 API 호출 시뮬레이션
      if (shouldFail) {
        throw new Error('Failed to fetch user data');
      }

      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 가끔 에러를 발생시키는 시뮬레이션
      if (Math.random() < 0.3) {
        throw new Error('Random API error occurred');
      }

      const mockUser: User = {
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`,
        avatar: `https://via.placeholder.com/150/FF6B6B/FFFFFF?text=U${userId}`,
      };

      setUser(mockUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      // 비동기 에러는 Error Boundary가 캐치하지 못하므로 상태로 관리
    } finally {
      setLoading(false);
    }
  };

  const triggerError = () => {
    // 렌더링 에러를 발생시키는 함수
    setError('Manual error triggered');
  };

  useEffect(() => {
    fetchUser();
  }, [userId, shouldFail]);

  if (loading) {
    return (
      <div className="user-profile loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    throw new Error(error); // Error Boundary가 캐치하도록 에러를 던짐
  }

  if (!user) {
    throw new Error('User data is null');
  }

  return (
    <div className="user-profile">
      <h3>User Profile</h3>
      <div className="profile-content">
        <img src={user.avatar} alt={user.name} className="avatar" />
        <div className="user-info">
          <h4>{user.name}</h4>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="profile-actions">
        <button onClick={fetchUser} className="refresh-button">
          Refresh Profile
        </button>
        <button onClick={triggerError} className="error-button">
          Trigger Error
        </button>
      </div>
    </div>
  );
};

export default BuggyUserProfile;
