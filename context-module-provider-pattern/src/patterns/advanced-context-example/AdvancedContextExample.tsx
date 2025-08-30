import React from 'react';
import { NotificationProvider, useNotification } from './NotificationContext';
import { NotificationContainer } from './NotificationContainer';

function NotificationDemo() {
  const { success, error, warning, info, setMaxNotifications } = useNotification();

  const handleSuccess = () => {
    success(
      'Success!',
      'Operation completed successfully.',
      5000
    );
  };

  const handleError = () => {
    error(
      'Error!',
      'Something went wrong. Please try again.',
      8000
    );
  };

  const handleWarning = () => {
    warning(
      'Warning!',
      'This action cannot be undone.',
      6000
    );
  };

  const handleInfo = () => {
    info(
      'Information',
      'Here is some useful information for you.',
      4000
    );
  };

  const handleMultipleNotifications = () => {
    success('First', 'First notification', 3000);
    setTimeout(() => error('Second', 'Second notification', 3000), 500);
    setTimeout(() => warning('Third', 'Third notification', 3000), 1000);
    setTimeout(() => info('Fourth', 'Fourth notification', 3000), 1500);
  };

  const handleChangeMaxNotifications = () => {
    setMaxNotifications(3);
    info('Settings Updated', 'Maximum notifications changed to 3', 3000);
  };

  const buttonStyle: React.CSSProperties = {
    padding: '12px 20px',
    margin: '8px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
  };

  const successButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    color: 'white',
  };

  const errorButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: 'white',
  };

  const warningButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#ffc107',
    color: '#212529',
  };

  const infoButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#17a2b8',
    color: 'white',
  };

  const multipleButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#6f42c1',
    color: 'white',
  };

  const settingsButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
    color: 'white',
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>
        🎯 Advanced Context Module Example
      </h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#555', marginBottom: '20px' }}>
          Notification System with Context Module Pattern
        </h2>
        <p style={{ lineHeight: '1.6', color: '#666' }}>
          이 예제는 Context Module Pattern을 사용하여 구현된 고급 알림 시스템입니다.
          전역 상태 관리, 타입 안전성, 재사용성을 모두 갖춘 완전한 알림 시스템을 보여줍니다.
        </p>
      </div>

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '24px', 
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <h3 style={{ marginTop: 0, color: '#333' }}>Context Module Pattern의 고급 기능</h3>
        <ul style={{ lineHeight: '1.6', color: '#555' }}>
          <li><strong>복잡한 상태 로직:</strong> useReducer를 통한 알림 상태 관리</li>
          <li><strong>타입 안전성:</strong> TypeScript로 모든 액션과 상태 타입 정의</li>
          <li><strong>편의 함수:</strong> success, error, warning, info 등 편리한 메서드</li>
          <li><strong>자동 제거:</strong> 설정 가능한 자동 제거 시간</li>
          <li><strong>최대 개수 제한:</strong> 동시 표시 가능한 알림 개수 제한</li>
          <li><strong>애니메이션:</strong> 부드러운 진입/진출 애니메이션</li>
        </ul>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '20px', color: '#333' }}>알림 테스트</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <button onClick={handleSuccess} style={successButtonStyle}>
            ✅ Success Notification
          </button>
          <button onClick={handleError} style={errorButtonStyle}>
            ❌ Error Notification
          </button>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <button onClick={handleWarning} style={warningButtonStyle}>
            ⚠️ Warning Notification
          </button>
          <button onClick={handleInfo} style={infoButtonStyle}>
            ℹ️ Info Notification
          </button>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <button onClick={handleMultipleNotifications} style={multipleButtonStyle}>
            🔄 Multiple Notifications
          </button>
        </div>
        
        <div>
          <button onClick={handleChangeMaxNotifications} style={settingsButtonStyle}>
            ⚙️ Change Max Notifications (3)
          </button>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#e7f3ff', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '40px'
      }}>
        <h3 style={{ marginTop: 0, color: '#0056b3' }}>코드 구조 분석</h3>
        <pre style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '16px', 
          borderRadius: '6px',
          overflow: 'auto',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
{`// 1. 타입 정의
interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  createdAt: Date;
}

// 2. 액션 타입
type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'createdAt'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_ALL_NOTIFICATIONS' };

// 3. Context 생성
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// 4. Provider 컴포넌트
export function NotificationProvider({ children, maxNotifications = 5 }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState);
  
  const success = useCallback((title, message, duration) => {
    addNotification({ type: 'success', title, message, duration });
  }, [addNotification]);
  
  // ... 다른 편의 함수들
}

// 5. Custom Hook
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
}

// 6. 컴포넌트에서 사용
function MyComponent() {
  const { success, error } = useNotification();
  
  const handleSuccess = () => {
    success('Success!', 'Operation completed successfully.', 5000);
  };
}`}
        </pre>
      </div>

      <div style={{ 
        backgroundColor: '#fff3cd', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h3 style={{ marginTop: 0, color: '#856404' }}>패턴의 장점</h3>
        <ul style={{ lineHeight: '1.6', color: '#856404' }}>
          <li><strong>전역 접근성:</strong> 앱 어디서든 알림 시스템 사용 가능</li>
          <li><strong>타입 안전성:</strong> TypeScript로 컴파일 타임 에러 방지</li>
          <li><strong>재사용성:</strong> 다른 프로젝트에서도 쉽게 재사용 가능</li>
          <li><strong>확장성:</strong> 새로운 알림 타입이나 기능 추가 용이</li>
          <li><strong>테스트 용이성:</strong> Provider를 Mock으로 교체하여 테스트 가능</li>
          <li><strong>성능 최적화:</strong> useCallback, useMemo로 불필요한 리렌더링 방지</li>
        </ul>
      </div>
    </div>
  );
}

export function AdvancedContextExample() {
  return (
    <NotificationProvider maxNotifications={5}>
      <NotificationDemo />
      <NotificationContainer />
    </NotificationProvider>
  );
}
