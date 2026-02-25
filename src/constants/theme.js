import {Colors} from './colors';
import {Fonts, FontSizes} from './fonts';

export const getTheme = isDark => {
  const colors = isDark ? Colors.dark : Colors.light;

  return {
    isDark,
    colors,
    fonts: Fonts,
    fontSizes: FontSizes,
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },
    borderRadius: {
      sm: 8,
      md: 12,
      lg: 16,
      xl: 24,
      full: 999,
    },
  };
};
