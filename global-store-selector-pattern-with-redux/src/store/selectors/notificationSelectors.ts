import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { Notification } from '../slices/notificationSlice';

// 기본 셀렉터들
export const selectNotifications = (state: RootState) => state.notification.notifications;
export const selectUnreadCount = (state: RootState) => state.notification.unreadCount;
export const selectMaxNotifications = (state: RootState) => state.notification.maxNotifications;

// 파생된 셀렉터들
export const selectHasNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.length > 0
);

export const selectHasUnreadNotifications = createSelector(
  [selectUnreadCount],
  (unreadCount) => unreadCount > 0
);

export const selectNotificationsCount = createSelector(
  [selectNotifications],
  (notifications) => notifications.length
);

// 읽기 상태별 필터링
export const selectReadNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.filter(notification => notification.read)
);

export const selectUnreadNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.filter(notification => !notification.read)
);

// 타입별 필터링
export const selectNotificationsByType = createSelector(
  [selectNotifications, (state: RootState, type: Notification['type']) => type],
  (notifications, type) => notifications.filter(notification => notification.type === type)
);

export const selectSuccessNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.filter(notification => notification.type === 'success')
);

export const selectErrorNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.filter(notification => notification.type === 'error')
);

export const selectWarningNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.filter(notification => notification.type === 'warning')
);

export const selectInfoNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.filter(notification => notification.type === 'info')
);

// 타입별 개수
export const selectNotificationTypeCounts = createSelector(
  [selectNotifications],
  (notifications) => {
    const counts = {
      success: 0,
      error: 0,
      warning: 0,
      info: 0,
    };
    
    notifications.forEach(notification => {
      counts[notification.type]++;
    });
    
    return counts;
  }
);

// 시간별 필터링
export const selectRecentNotifications = createSelector(
  [selectNotifications, (state: RootState, hours: number = 24) => hours],
  (notifications, hours) => {
    const cutoffTime = Date.now() - (hours * 60 * 60 * 1000);
    return notifications.filter(notification => notification.timestamp > cutoffTime);
  }
);

export const selectTodayNotifications = createSelector(
  [selectNotifications],
  (notifications) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();
    
    return notifications.filter(notification => notification.timestamp >= todayTimestamp);
  }
);

// 정렬된 알림들
export const selectSortedNotifications = createSelector(
  [selectNotifications, (state: RootState, sortBy: 'timestamp' | 'type' | 'read' = 'timestamp') => sortBy],
  (notifications, sortBy) => {
    const sorted = [...notifications];
    
    switch (sortBy) {
      case 'timestamp':
        return sorted.sort((a, b) => b.timestamp - a.timestamp);
      case 'type':
        return sorted.sort((a, b) => a.type.localeCompare(b.type));
      case 'read':
        return sorted.sort((a, b) => Number(a.read) - Number(b.read));
      default:
        return sorted;
    }
  }
);

// 특정 알림 찾기
export const selectNotificationById = createSelector(
  [selectNotifications, (state: RootState, id: string) => id],
  (notifications, id) => notifications.find(notification => notification.id === id)
);

// 알림 요약 정보
export const selectNotificationSummary = createSelector(
  [
    selectNotificationsCount,
    selectUnreadCount,
    selectNotificationTypeCounts,
    selectMaxNotifications,
  ],
  (totalCount, unreadCount, typeCounts, maxNotifications) => ({
    total: totalCount,
    unread: unreadCount,
    read: totalCount - unreadCount,
    typeCounts,
    maxNotifications,
    isAtCapacity: totalCount >= maxNotifications,
  })
);

// 알림 그룹화 (날짜별)
export const selectNotificationsGroupedByDate = createSelector(
  [selectNotifications],
  (notifications) => {
    const grouped = notifications.reduce((acc, notification) => {
      const date = new Date(notification.timestamp);
      const dateKey = date.toDateString();
      
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(notification);
      return acc;
    }, {} as Record<string, Notification[]>);
    
    // 날짜별로 정렬
    return Object.entries(grouped)
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
      .reduce((acc, [date, notifications]) => {
        acc[date] = notifications.sort((a, b) => b.timestamp - a.timestamp);
        return acc;
      }, {} as Record<string, Notification[]>);
  }
);

// 알림 통계
export const selectNotificationStats = createSelector(
  [selectNotifications],
  (notifications) => {
    const stats = {
      total: notifications.length,
      unread: 0,
      read: 0,
      byType: {
        success: 0,
        error: 0,
        warning: 0,
        info: 0,
      },
      averageAge: 0,
    };
    
    let totalAge = 0;
    
    notifications.forEach(notification => {
      if (notification.read) {
        stats.read++;
      } else {
        stats.unread++;
      }
      
      stats.byType[notification.type]++;
      totalAge += Date.now() - notification.timestamp;
    });
    
    stats.averageAge = notifications.length > 0 ? totalAge / notifications.length : 0;
    
    return stats;
  }
);

// 알림 우선순위 (에러 > 경고 > 정보 > 성공)
export const selectPrioritizedNotifications = createSelector(
  [selectNotifications],
  (notifications) => {
    const priorityOrder = { error: 4, warning: 3, info: 2, success: 1 };
    
    return [...notifications].sort((a, b) => {
      const priorityDiff = priorityOrder[b.type] - priorityOrder[a.type];
      if (priorityDiff !== 0) return priorityDiff;
      
      // 우선순위가 같으면 시간순 정렬 (최신순)
      return b.timestamp - a.timestamp;
    });
  }
);

// 읽지 않은 알림 중 우선순위가 높은 것들
export const selectHighPriorityUnreadNotifications = createSelector(
  [selectPrioritizedNotifications],
  (notifications) => 
    notifications.filter(notification => !notification.read && ['error', 'warning'].includes(notification.type))
);
