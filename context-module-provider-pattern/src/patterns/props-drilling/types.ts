// Props Drilling 패턴에서 사용하는 타입 정의

export interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export type Theme = 'light' | 'dark';

export interface ThemeConfig {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

// Props 타입들
export interface UserProfileProps {
  user: User;
  onLogin: (userData: Omit<User, 'isLoggedIn'>) => void;
  onLogout: () => void;
  onUpdateProfile: (profileData: Partial<Omit<User, 'id' | 'isLoggedIn'>>) => void;
}

export interface ThemeToggleProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export interface HeaderProps {
  user: User;
  theme: Theme;
  onLogout: () => void;
  onToggleTheme: () => void;
}
