import React, { createContext, useContext, useState, ReactNode } from 'react';

// 테마 타입 정의
type Theme = 'light' | 'dark';

// 테마 설정 타입 정의
interface ThemeConfig {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

// 테마별 설정
const themeConfigs: Record<Theme, ThemeConfig> = {
  light: {
    primaryColor: '#007bff',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    borderColor: '#e0e0e0',
  },
  dark: {
    primaryColor: '#4dabf7',
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
    borderColor: '#404040',
  },
};

// Context 타입 정의
interface ThemeContextType {
  theme: Theme;
  themeConfig: ThemeConfig;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider 컴포넌트
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

export function ThemeProvider({ children, initialTheme = 'light' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  const toggleTheme = () => {
    setThemeState(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const themeConfig = themeConfigs[theme];

  const value: ThemeContextType = {
    theme,
    themeConfig,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Custom Hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
