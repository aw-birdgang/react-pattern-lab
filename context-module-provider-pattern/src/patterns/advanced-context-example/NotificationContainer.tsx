import React from 'react';
import { useNotification } from './NotificationContext';
import { NotificationToast } from './NotificationToast';

export function NotificationContainer() {
  const { notifications, clearAllNotifications } = useNotification();

  if (notifications.length === 0) return null;

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    padding: '8px 12px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    borderRadius: '6px',
    fontSize: '14px',
  };

  const clearButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '12px',
    textDecoration: 'underline',
    marginLeft: '12px',
  };

  return (
    <div style={containerStyle}>
      {notifications.length > 1 && (
        <div style={headerStyle}>
          <span>{notifications.length} notifications</span>
          <button
            onClick={clearAllNotifications}
            style={clearButtonStyle}
          >
            Clear all
          </button>
        </div>
      )}
      {notifications.map(notification => (
        <NotificationToast
          key={notification.id}
          notification={notification}
        />
      ))}
    </div>
  );
}
