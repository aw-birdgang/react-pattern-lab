import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark';
    language: 'ko' | 'en';
    notifications: boolean;
  };
}

export interface UserState {
  currentUser: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    updateUserPreferences: (state, action: PayloadAction<Partial<User['preferences']>>) => {
      if (state.currentUser) {
        state.currentUser.preferences = {
          ...state.currentUser.preferences,
          ...action.payload,
        };
      }
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<{ id: string; updates: Partial<User> }>) => {
      const { id, updates } = action.payload;
      const userIndex = state.users.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...updates };
      }
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  setCurrentUser,
  updateUserPreferences,
  setUsers,
  addUser,
  updateUser,
  removeUser,
  setLoading,
  setError,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
