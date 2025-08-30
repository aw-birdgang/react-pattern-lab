import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';

// 알림 타입 정의
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number; // 자동 제거 시간 (ms)
  createdAt: Date;
}

// 알림 상태 타입
interface NotificationState {
  notifications: Notification[];
  maxNotifications: number;
}

// 액션 타입
type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'createdAt'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_ALL_NOTIFICATIONS' }
  | { type: 'SET_MAX_NOTIFICATIONS'; payload: number };

// 초기 상태
const initialState: NotificationState = {
  notifications: [],
  maxNotifications: 5,
};

// 리듀서 함수
function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      const newNotification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date(),
      };

      const updatedNotifications = [newNotification, ...state.notifications];
      
      // 최대 알림 개수 제한
      if (updatedNotifications.length > state.maxNotifications) {
        updatedNotifications.splice(state.maxNotifications);
      }

      return {
        ...state,
        notifications: updatedNotifications,
      };
    }

    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload),
      };

    case 'CLEAR_ALL_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
      };

    case 'SET_MAX_NOTIFICATIONS':
      return {
        ...state,
        maxNotifications: action.payload,
      };

    default:
      return state;
  }
}

// Context 타입 정의
interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  setMaxNotifications: (max: number) => void;
  success: (title: string, message: string, duration?: number) => void;
  error: (title: string, message: string, duration?: number) => void;
  warning: (title: string, message: string, duration?: number) => void;
  info: (title: string, message: string, duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provider 컴포넌트
interface NotificationProviderProps {
  children: ReactNode;
  maxNotifications?: number;
}

export function NotificationProvider({ 
  children, 
  maxNotifications = 5 
}: NotificationProviderProps) {
  const [state, dispatch] = useReducer(notificationReducer, {
    ...initialState,
    maxNotifications,
  });

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'createdAt'>) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  }, []);

  const removeNotification = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  }, []);

  const clearAllNotifications = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL_NOTIFICATIONS' });
  }, []);

  const setMaxNotifications = useCallback((max: number) => {
    dispatch({ type: 'SET_MAX_NOTIFICATIONS', payload: max });
  }, []);

  // 편의 함수들
  const success = useCallback((title: string, message: string, duration?: number) => {
    addNotification({ type: 'success', title, message, duration });
  }, [addNotification]);

  const error = useCallback((title: string, message: string, duration?: number) => {
    addNotification({ type: 'error', title, message, duration });
  }, [addNotification]);

  const warning = useCallback((title: string, message: string, duration?: number) => {
    addNotification({ type: 'warning', title, message, duration });
  }, [addNotification]);

  const info = useCallback((title: string, message: string, duration?: number) => {
    addNotification({ type: 'info', title, message, duration });
  }, [addNotification]);

  const value: NotificationContextType = {
    notifications: state.notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    setMaxNotifications,
    success,
    error,
    warning,
    info,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

// Custom Hook
export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
