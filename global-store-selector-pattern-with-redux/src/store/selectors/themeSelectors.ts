import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

// 기본 셀렉터들
export const selectThemeMode = (state: RootState) => state.theme.mode;
export const selectThemeColors = (state: RootState) => state.theme.colors;
export const selectFontSize = (state: RootState) => state.theme.fontSize;
export const selectBorderRadius = (state: RootState) => state.theme.borderRadius;
export const selectSpacing = (state: RootState) => state.theme.spacing;

// 파생된 셀렉터들
export const selectIsDarkMode = createSelector(
  [selectThemeMode],
  (mode) => mode === 'dark'
);

export const selectIsLightMode = createSelector(
  [selectThemeMode],
  (mode) => mode === 'light'
);

// 색상 관련 셀렉터들
export const selectPrimaryColor = createSelector(
  [selectThemeColors],
  (colors) => colors.primary
);

export const selectSecondaryColor = createSelector(
  [selectThemeColors],
  (colors) => colors.secondary
);

export const selectBackgroundColor = createSelector(
  [selectThemeColors],
  (colors) => colors.background
);

export const selectSurfaceColor = createSelector(
  [selectThemeColors],
  (colors) => colors.surface
);

export const selectTextColor = createSelector(
  [selectThemeColors],
  (colors) => colors.text
);

export const selectTextSecondaryColor = createSelector(
  [selectThemeColors],
  (colors) => colors.textSecondary
);

export const selectBorderColor = createSelector(
  [selectThemeColors],
  (colors) => colors.border
);

// 상태 색상들
export const selectErrorColor = createSelector(
  [selectThemeColors],
  (colors) => colors.error
);

export const selectSuccessColor = createSelector(
  [selectThemeColors],
  (colors) => colors.success
);

export const selectWarningColor = createSelector(
  [selectThemeColors],
  (colors) => colors.warning
);

// 폰트 크기 관련
export const selectFontSizeValue = createSelector(
  [selectFontSize],
  (fontSize) => {
    switch (fontSize) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px';
    }
  }
);

export const selectFontSizeClass = createSelector(
  [selectFontSize],
  (fontSize) => `font-size-${fontSize}`
);

// 테두리 반경 관련
export const selectBorderRadiusValue = createSelector(
  [selectBorderRadius],
  (borderRadius) => {
    switch (borderRadius) {
      case 'none': return '0px';
      case 'small': return '4px';
      case 'large': return '16px';
      default: return '8px';
    }
  }
);

export const selectBorderRadiusClass = createSelector(
  [selectBorderRadius],
  (borderRadius) => `border-radius-${borderRadius}`
);

// 간격 관련
export const selectSpacingValue = createSelector(
  [selectSpacing],
  (spacing) => {
    switch (spacing) {
      case 'compact': return '8px';
      case 'spacious': return '24px';
      default: return '16px';
    }
  }
);

export const selectSpacingClass = createSelector(
  [selectSpacing],
  (spacing) => `spacing-${spacing}`
);

// CSS 변수 객체 생성
export const selectThemeCSSVariables = createSelector(
  [
    selectThemeColors,
    selectFontSizeValue,
    selectBorderRadiusValue,
    selectSpacingValue,
  ],
  (colors, fontSize, borderRadius, spacing) => ({
    '--color-primary': colors.primary,
    '--color-secondary': colors.secondary,
    '--color-background': colors.background,
    '--color-surface': colors.surface,
    '--color-text': colors.text,
    '--color-text-secondary': colors.textSecondary,
    '--color-border': colors.border,
    '--color-error': colors.error,
    '--color-success': colors.success,
    '--color-warning': colors.warning,
    '--font-size': fontSize,
    '--border-radius': borderRadius,
    '--spacing': spacing,
  })
);

// 테마 클래스명 생성
export const selectThemeClasses = createSelector(
  [
    selectThemeMode,
    selectFontSizeClass,
    selectBorderRadiusClass,
    selectSpacingClass,
  ],
  (mode, fontSizeClass, borderRadiusClass, spacingClass) => [
    `theme-${mode}`,
    fontSizeClass,
    borderRadiusClass,
    spacingClass,
  ].join(' ')
);

// 복합 셀렉터 - 테마 설정 요약
export const selectThemeSummary = createSelector(
  [
    selectThemeMode,
    selectFontSize,
    selectBorderRadius,
    selectSpacing,
    selectThemeColors,
  ],
  (mode, fontSize, borderRadius, spacing, colors) => ({
    mode,
    fontSize,
    borderRadius,
    spacing,
    colors,
    isDark: mode === 'dark',
    isLight: mode === 'light',
  })
);

// 접근성 관련 셀렉터들
export const selectHighContrastMode = createSelector(
  [selectThemeColors],
  (colors) => {
    // 간단한 대비 계산 (실제로는 더 복잡한 알고리즘 사용)
    const background = colors.background;
    const text = colors.text;
    
    // 색상 대비 계산 로직 (간단한 예시)
    return Math.abs(
      parseInt(background.replace('#', ''), 16) - 
      parseInt(text.replace('#', ''), 16)
    ) > 1000000;
  }
);

// 반응형 테마 설정
export const selectResponsiveTheme = createSelector(
  [
    selectThemeMode,
    selectFontSize,
    (state: RootState, screenSize: 'mobile' | 'tablet' | 'desktop') => screenSize,
  ],
  (mode, fontSize, screenSize) => {
    let adjustedFontSize = fontSize;
    
    // 모바일에서는 폰트 크기를 조정
    if (screenSize === 'mobile' && fontSize === 'small') {
      adjustedFontSize = 'medium';
    }
    
    return {
      mode,
      fontSize: adjustedFontSize,
      isMobile: screenSize === 'mobile',
      isTablet: screenSize === 'tablet',
      isDesktop: screenSize === 'desktop',
    };
  }
);
