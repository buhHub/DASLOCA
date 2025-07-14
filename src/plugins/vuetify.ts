import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/lib/util/colors'
import { en, nl } from 'vuetify/locale'

export const minDefBlue = '#154273';
export const clskOrange = '#E17000';

export const defaultTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: minDefBlue,
    secondary: clskOrange,
 
    // Status
    error: '#B71C1C',
    warning: '#ed6c02',
    info: '#009EE0',
    success: '#4CAF50',
 
    // Temporary revert grey till transfer
    white: '#FFFFFF',
    lightgrey: '#F5F5F5',
    grey: '#E0E0E0',
    darkgrey: '#9E9E9E',
    black: '#000000',
 
    orange: '#f39900',
    accent: '#009de0',
    'light-blue': '#009de0',
    purple: '#64207e',
    none: colors.grey.lighten1,
    att: colors.grey.darken1,
    basic: colors.orange.darken3,
    spec: colors.green.base,
    rts: '#6697B7',
    gun: colors.red.accent4,
    cas: colors.yellow.darken1,
    mount: colors.brown.base,
    notready: colors.red.lighten1,
    ready: colors.green.base,
  },
};

export default createVuetify({
  components,
  directives,
  locale: {
    locale: 'nl',
    fallback: 'en',
    messages: { nl, en },
  },
  theme: {
    defaultTheme: 'defaultTheme',
    themes: {
      defaultTheme,
    },
  },
});