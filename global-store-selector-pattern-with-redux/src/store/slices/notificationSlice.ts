import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number; // 자동 제거 시간 (ms), undefined면 수동으로만 제거
  timestamp: number;
  read: boolean;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  maxNotifications: number;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  maxNotifications: 10,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp' | 'read'>>) => {
      const newNotification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
        read: false,
      };
      
      state.notifications.unshift(newNotification);
      state.unreadCount += 1;
      
      // 최대 알림 수 제한
      if (state.notifications.length > state.maxNotifications) {
        const removed = state.notifications.pop();
        if (removed && !removed.read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    setMaxNotifications: (state, action: PayloadAction<number>) => {
      state.maxNotifications = action.payload;
      // 현재 알림 수가 최대치를 초과하면 오래된 것부터 제거
      if (state.notifications.length > state.maxNotifications) {
        const removedCount = state.notifications.length - state.maxNotifications;
        const removedNotifications = state.notifications.splice(-removedCount);
        const unreadRemoved = removedNotifications.filter(n => !n.read).length;
        state.unreadCount = Math.max(0, state.unreadCount - unreadRemoved);
      }
    },
  },
});

export const {
  addNotification,
  removeNotification,
  markAsRead,
  markAllAsRead,
  clearAllNotifications,
  setMaxNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
