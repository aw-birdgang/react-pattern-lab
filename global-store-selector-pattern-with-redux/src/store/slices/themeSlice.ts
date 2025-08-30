import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}

export interface ThemeState {
  mode: 'light' | 'dark';
  colors: ThemeColors;
  fontSize: 'small' | 'medium' | 'large';
  borderRadius: 'none' | 'small' | 'medium' | 'large';
  spacing: 'compact' | 'comfortable' | 'spacious';
}

const lightColors: ThemeColors = {
  primary: '#1976d2',
  secondary: '#dc004e',
  background: '#ffffff',
  surface: '#f5f5f5',
  text: '#212121',
  textSecondary: '#757575',
  border: '#e0e0e0',
  error: '#d32f2f',
  success: '#388e3c',
  warning: '#f57c00',
};

const darkColors: ThemeColors = {
  primary: '#90caf9',
  secondary: '#f48fb1',
  background: '#121212',
  surface: '#1e1e1e',
  text: '#ffffff',
  textSecondary: '#b0b0b0',
  border: '#333333',
  error: '#f44336',
  success: '#4caf50',
  warning: '#ff9800',
};

const initialState: ThemeState = {
  mode: 'light',
  colors: lightColors,
  fontSize: 'medium',
  borderRadius: 'medium',
  spacing: 'comfortable',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      state.colors = state.mode === 'light' ? lightColors : darkColors;
    },
    setThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload;
      state.colors = action.payload === 'light' ? lightColors : darkColors;
    },
    setFontSize: (state, action: PayloadAction<'small' | 'medium' | 'large'>) => {
      state.fontSize = action.payload;
    },
    setBorderRadius: (state, action: PayloadAction<'none' | 'small' | 'medium' | 'large'>) => {
      state.borderRadius = action.payload;
    },
    setSpacing: (state, action: PayloadAction<'compact' | 'comfortable' | 'spacious'>) => {
      state.spacing = action.payload;
    },
    updateColors: (state, action: PayloadAction<Partial<ThemeColors>>) => {
      state.colors = { ...state.colors, ...action.payload };
    },
  },
});

export const {
  toggleTheme,
  setThemeMode,
  setFontSize,
  setBorderRadius,
  setSpacing,
  updateColors,
} = themeSlice.actions;

export default themeSlice.reducer;
