import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// 사용자 상태 타입 정의
interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

// 액션 타입 정의
type UserAction =
  | { type: 'LOGIN'; payload: Omit<User, 'isLoggedIn'> }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE'; payload: Partial<Omit<User, 'id' | 'isLoggedIn'>> };

// 초기 상태
const initialState: User = {
  id: '',
  name: '',
  email: '',
  isLoggedIn: false,
};

// 리듀서 함수
function userReducer(state: User, action: UserAction): User {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

// Context 생성
interface UserContextType {
  user: User;
  login: (userData: Omit<User, 'isLoggedIn'>) => void;
  logout: () => void;
  updateProfile: (profileData: Partial<Omit<User, 'id' | 'isLoggedIn'>>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider 컴포넌트
interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, dispatch] = useReducer(userReducer, initialState);

  const login = (userData: Omit<User, 'isLoggedIn'>) => {
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = (profileData: Partial<Omit<User, 'id' | 'isLoggedIn'>>) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: profileData });
  };

  const value: UserContextType = {
    user,
    login,
    logout,
    updateProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Custom Hook
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
