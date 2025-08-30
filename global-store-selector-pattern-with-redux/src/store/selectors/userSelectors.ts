import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { User } from '../slices/userSlice';

// 기본 셀렉터들
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUsers = (state: RootState) => state.user.users;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

// 파생된 셀렉터들
export const selectIsLoggedIn = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser !== null
);

export const selectUserRole = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser?.role || 'guest'
);

export const selectIsAdmin = createSelector(
  [selectUserRole],
  (role) => role === 'admin'
);

export const selectUserPreferences = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser?.preferences || null
);

export const selectThemePreference = createSelector(
  [selectUserPreferences],
  (preferences) => preferences?.theme || 'light'
);

export const selectLanguagePreference = createSelector(
  [selectUserPreferences],
  (preferences) => preferences?.language || 'ko'
);

export const selectNotificationPreference = createSelector(
  [selectUserPreferences],
  (preferences) => preferences?.notifications ?? true
);

// 사용자 목록 관련 셀렉터들
export const selectUsersByRole = createSelector(
  [selectUsers, (state: RootState, role: User['role']) => role],
  (users, role) => users.filter(user => user.role === role)
);

export const selectActiveUsers = createSelector(
  [selectUsers],
  (users) => users.filter(user => user.role !== 'guest')
);

export const selectUserById = createSelector(
  [selectUsers, (state: RootState, userId: string) => userId],
  (users, userId) => users.find(user => user.id === userId)
);

export const selectUsersCount = createSelector(
  [selectUsers],
  (users) => users.length
);

export const selectUsersByRoleCount = createSelector(
  [selectUsersByRole],
  (users) => users.length
);

// 복합 셀렉터들
export const selectUserStats = createSelector(
  [selectUsers],
  (users) => {
    const stats = {
      total: users.length,
      admin: 0,
      user: 0,
      guest: 0,
    };
    
    users.forEach(user => {
      stats[user.role]++;
    });
    
    return stats;
  }
);

export const selectUserDisplayInfo = createSelector(
  [selectCurrentUser],
  (currentUser) => {
    if (!currentUser) return null;
    
    return {
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role,
      avatar: currentUser.avatar,
      theme: currentUser.preferences.theme,
      language: currentUser.preferences.language,
    };
  }
);
