import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

// Mock API 함수
const fetchUsers = async (): Promise<User[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (Math.random() > 0.7) {
    throw new Error('Failed to fetch users');
  }
  
  return [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
};

const ApiExample: React.FC = () => {
  // 각 컴포넌트마다 중복되는 API 로직
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchUsers();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="example-container">
      <h2>API 호출 예제 (Before)</h2>
      <p>Custom Hook을 사용하지 않은 원본 구현</p>
      
      <div className="api-example">
        <div className="api-controls">
          <button onClick={fetchData} disabled={loading}>
            {loading ? '로딩 중...' : '사용자 목록 새로고침'}
          </button>
        </div>

        <div className="api-content">
          {loading && <div className="loading">데이터를 불러오는 중...</div>}
          
          {error && (
            <div className="error">
              <h4>에러 발생:</h4>
              <p>{error}</p>
            </div>
          )}
          
          {data.length > 0 && !loading && (
            <div className="users-list">
              <h4>사용자 목록:</h4>
              <ul>
                {data.map(user => (
                  <li key={user.id}>
                    <strong>{user.name}</strong> - {user.email}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="code-section">
        <h4>Before: Custom Hook 없음</h4>
        <pre>
{`// 각 컴포넌트마다 중복되는 API 로직
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchData = async () => {
  setLoading(true);
  setError(null);
  try {
    const result = await apiCall();
    setData(result);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchData();
}, []);

// 문제점:
// ❌ 각 컴포넌트마다 중복되는 API 로직
// ❌ 로딩, 에러 상태 관리가 복잡
// ❌ 재사용이 어려움
// ❌ 코드가 길고 반복됨`}
        </pre>
      </div>
    </div>
  );
};

export default ApiExample;
