import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const AppTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f2f7fe',
      100: '#e0ebfd',
      200: '#b3ccfb',
      300: '#80aaf8',
      400: '#4d88f5',
      500: '#0055f1',
      600: '#0048cd',
      700: '#003ca9',
      800: '#002f85',
      900: '#002260',
      950: '#001544',
    },
  },
});
