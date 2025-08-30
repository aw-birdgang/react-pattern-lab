import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import themeReducer from './slices/themeSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    theme: themeReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Date 객체나 함수 등이 포함된 액션을 허용
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['some.path.to.ignore'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 타입 안전성을 위한 커스텀 훅들
export type AppStore = typeof store;
