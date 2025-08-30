import React, { useEffect, useState } from 'react';
import { Notification, useNotification } from './NotificationContext';

interface NotificationToastProps {
  notification: Notification;
}

export function NotificationToast({ notification }: NotificationToastProps) {
  const { removeNotification } = useNotification();
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  // 자동 제거 로직
  useEffect(() => {
    if (notification.duration) {
      const timer = setTimeout(() => {
        handleRemove();
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification.duration]);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      removeNotification(notification.id);
    }, 300); // 애니메이션 시간
  };

  if (!isVisible) return null;

  // 알림 타입별 스타일
  const getTypeStyles = () => {
    switch (notification.type) {
      case 'success':
        return {
          backgroundColor: '#d4edda',
          borderColor: '#c3e6cb',
          color: '#155724',
          icon: '✅',
        };
      case 'error':
        return {
          backgroundColor: '#f8d7da',
          borderColor: '#f5c6cb',
          color: '#721c24',
          icon: '❌',
        };
      case 'warning':
        return {
          backgroundColor: '#fff3cd',
          borderColor: '#ffeaa7',
          color: '#856404',
          icon: '⚠️',
        };
      case 'info':
        return {
          backgroundColor: '#d1ecf1',
          borderColor: '#bee5eb',
          color: '#0c5460',
          icon: 'ℹ️',
        };
      default:
        return {
          backgroundColor: '#f8f9fa',
          borderColor: '#e9ecef',
          color: '#495057',
          icon: '📢',
        };
    }
  };

  const typeStyles = getTypeStyles();

  const toastStyle: React.CSSProperties = {
    position: 'relative',
    padding: '16px',
    marginBottom: '8px',
    borderRadius: '8px',
    border: `1px solid ${typeStyles.borderColor}`,
    backgroundColor: typeStyles.backgroundColor,
    color: typeStyles.color,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transform: isExiting ? 'translateX(100%)' : 'translateX(0)',
    transition: 'transform 0.3s ease-in-out',
    maxWidth: '400px',
    minWidth: '300px',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px',
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const messageStyle: React.CSSProperties = {
    margin: 0,
    fontSize: '14px',
    lineHeight: '1.4',
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: typeStyles.color,
    opacity: 0.7,
    padding: '0',
    marginLeft: '8px',
  };

  const timeStyle: React.CSSProperties = {
    fontSize: '12px',
    opacity: 0.7,
    marginTop: '8px',
  };

  return (
    <div style={toastStyle}>
      <div style={headerStyle}>
        <h4 style={titleStyle}>
          <span>{typeStyles.icon}</span>
          {notification.title}
        </h4>
        <button
          onClick={handleRemove}
          style={closeButtonStyle}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
      <p style={messageStyle}>{notification.message}</p>
      <div style={timeStyle}>
        {notification.createdAt.toLocaleTimeString()}
      </div>
    </div>
  );
}
