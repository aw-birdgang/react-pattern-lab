import React from 'react';
import { useApi } from '../../hooks/useApi';

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
  const { data: users, loading, error, refetch } = useApi(fetchUsers);

  return (
    <div className="example-container">
      <h2>API 호출 예제 (After)</h2>
      <p>Custom Hook을 사용한 개선된 구현</p>
      
      <div className="api-example">
        <div className="api-controls">
          <button onClick={refetch} disabled={loading}>
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
          
          {users && !loading && (
            <div className="users-list">
              <h4>사용자 목록:</h4>
              <ul>
                {users.map(user => (
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
        <h4>After: Custom Hook 사용</h4>
        <pre>
{`// Custom Hook으로 API 로직 캡슐화
const { data, loading, error, refetch } = useApi(fetchUsers);

// useApi Hook 내부
export const useApi = (apiCall, dependencies = [], immediate = true) => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null
  });
  
  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await apiCall();
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error.message });
    }
  }, [apiCall]);
  
  useEffect(() => {
    if (immediate) fetchData();
  }, [fetchData, immediate, ...dependencies]);
  
  return { ...state, refetch: fetchData };
};

// 장점:
// ✅ API 로직이 Custom Hook으로 캡슐화됨
// ✅ 로딩, 에러 상태 관리가 단순해짐
// ✅ 다른 컴포넌트에서도 쉽게 재사용 가능
// ✅ 코드가 간결해짐`}
        </pre>
      </div>
    </div>
  );
};

export default ApiExample;
