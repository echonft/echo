import { mergeLeft } from 'ramda'
import defaultTheme, { fontFamily } from 'tailwindcss/defaultTheme'

type fontSizeConfig = [
  string,
  Partial<{
    lineHeight: string
    letterSpacing: string
    fontWeight: string | number
  }>
]
export const themeExtension = {
  backgroundImage: {
    banner: 'linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, #121212 100%)',
    collectionTitle: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 101.27%)',
    home: 'linear-gradient(162deg, rgba(239, 244, 39, 0.20) -11.34%, #121212 42.54%)',
    main: 'linear-gradient(95.27deg, #EFF427 7.68%, #8F27F5 100%)',
    'main/40': 'linear-gradient(95.27deg, rgba(239, 244, 39, 0.4) 7.68%, rgba(143, 39, 245, 0.4) 100%)',
    nftButtonHover: 'linear-gradient(94deg, rgba(211, 190, 190, 0.12) -7.35%, rgba(217, 217, 217, 0.00) 104.39%)',
    offerYellow: 'linear-gradient(225deg, rgba(239, 244, 39, 0.20) 5.29%, rgba(0, 0, 0, 0.00) 63.02%)',
    offerGreen: 'linear-gradient(225deg, rgba(75, 191, 75, 0.20) 5.29%, rgba(0, 0, 0, 0.00) 63.02%)',
    offerRed: 'linear-gradient(225deg, rgba(255, 64, 64, 0.20) 5.29%, rgba(0, 0, 0, 0.00) 63.02%)'
  },
  borderColor: {
    DEFAULT: 'transparent'
  },
  borderWidth: {
    3: '3px'
  },
  boxShadow: {
    modal: '4px 4px 4px 0px rgba(0, 0, 0, 0.45)',
    tag: '2px 2px 4px 0px rgba(0, 0, 0, 0.57)'
  },
  colors: {
    dark: {
      100: '#3D3C3C',
      200: '#363434',
      300: '#312E2E',
      400: '#2C2929',
      500: '#121212',
      600: '#0F0F0F',
      700: '#0D0D0D',
      800: '#0A0909',
      900: '#030303'
    },
    green: {
      100: '#C2FFC2',
      200: '#97FD97',
      300: '#66CC66',
      400: '#4BBF4B',
      500: '#2BA32B',
      600: '#198319',
      700: '#0E5F0E',
      800: '#094809',
      900: '#003D00'
    },
    purple: {
      100: '#EBECFF',
      200: '#9FA5F1',
      300: '#8790F6',
      400: '#7D86FB',
      500: '#5662F6',
      600: '#4A54D4',
      700: '#3E47B2',
      800: '#252E9D',
      900: '#000540'
    },
    red: {
      100: '#FFEBEB',
      200: '#FFBFBF',
      300: '#FF8080',
      400: '#FF4040',
      500: '#FF0000',
      600: '#BF0000',
      700: '#800000',
      800: '#FF0000',
      900: '#3D0000'
    },
    yellow: {
      100: '#FFFFEB',
      200: '#FDFF9D',
      300: '#FCFF80',
      400: '#FBFF66',
      500: '#EFF427',
      600: '#D9DE17',
      700: '#AEB209',
      800: '#93970A',
      900: '#4B4D00'
    }
  },
  dropShadow: {
    alerts: '4px 4px 4px rgba(0, 0, 0, 0.45)',
    tags: '2px 2px 4px rgba(0, 0, 0, 0.57)'
  },
  fontFamily: {
    inter: ['var(--font-inter)', 'Inter', ...fontFamily.sans]
  },
  fontSize: {
    'display-lg-bold': [
      '4rem',
      {
        lineHeight: '112%',
        fontWeight: 700
      }
    ] as fontSizeConfig,
    'display-lg-light': [
      '4rem',
      {
        lineHeight: '112%',
        fontWeight: 300
      }
    ] as fontSizeConfig,
    'display-md': [
      '3rem',
      {
        lineHeight: '117%',
        fontWeight: 500
      }
    ] as fontSizeConfig,
    'display-md-bold': [
      '3rem',
      {
        lineHeight: '117%',
        fontWeight: 700
      }
    ] as fontSizeConfig,
    'display-md-light': [
      '3rem',
      {
        lineHeight: '117%',
        fontWeight: 300
      }
    ] as fontSizeConfig,
    'display-sm': [
      '2rem',
      {
        lineHeight: '119%',
        fontWeight: 500
      }
    ] as fontSizeConfig,
    'display-sm-bold': [
      '0.9375rem',
      {
        lineHeight: '155%',
        fontWeight: 700
      }
    ] as fontSizeConfig,
    'display-sm-light': [
      '2rem',
      {
        lineHeight: '119%',
        fontWeight: 300
      }
    ] as fontSizeConfig,
    'header-lg-semi': [
      '2rem',
      {
        lineHeight: '119%',
        fontWeight: 600
      }
    ] as fontSizeConfig,
    'header-lg': [
      '2rem',
      {
        lineHeight: '119%',
        fontWeight: 500
      }
    ] as fontSizeConfig,
    'header-md-semi': [
      '1.5rem',
      {
        lineHeight: '125%',
        fontWeight: 600
      }
    ] as fontSizeConfig,
    'header-md': [
      '1.5rem',
      {
        lineHeight: '125%',
        fontWeight: 500
      }
    ] as fontSizeConfig,
    'header-sm-semi': [
      '1.25rem',
      {
        lineHeight: '120%',
        fontWeight: 600
      }
    ] as fontSizeConfig,
    'header-sm': [
      '1.25rem',
      {
        lineHeight: '120%',
        fontWeight: 500
      }
    ] as fontSizeConfig,
    'header-xs-semi': [
      '1rem',
      {
        lineHeight: '125%',
        fontWeight: 600
      }
    ] as fontSizeConfig,
    'header-xs': [
      '1rem',
      {
        lineHeight: '125%',
        fontWeight: 500
      }
    ] as fontSizeConfig,
    'paragraph-xl': [
      '1.25rem',
      {
        lineHeight: '140%',
        fontWeight: 500
      }
    ] as fontSizeConfig,
    'paragraph-xl-light': [
      '1.25rem',
      {
        lineHeight: '140%',
        fontWeight: 300
      }
    ] as fontSizeConfig,
    'paragraph-lg': [
      '1.125rem',
      {
        lineHeight: '144%',
        fontWeight: 500
      }
    ] as fontSizeConfig,
    'paragraph-lg-light': [
      '1.125rem',
      {
        lineHeight: '144%',
        fontWeight: 300
      }
    ] as fontSizeConfig,
    'paragraph-md': [
      '1rem',
      {
        lineHeight: '157%',
        fontWeight: 500
      }
    ] as fontSizeConfig,
    'paragraph-md-light': [
      '1rem',
      {
        lineHeight: '157%',
        fontWeight: 300
      }
    ] as fontSizeConfig,
    'paragraph-sm': [
      '0.875rem',
      {
        lineHeight: '157%',
        fontWeight: 500
      }
    ] as fontSizeConfig,
    'paragraph-sm-light': [
      '0.875rem',
      {
        lineHeight: '157%',
        fontWeight: 300
      }
    ] as fontSizeConfig,
    'paragraph-xs': [
      '0.75rem',
      {
        lineHeight: '150%',
        fontWeight: 500
      }
    ] as fontSizeConfig,
    'paragraph-xs-light': [
      '0.75rem',
      {
        lineHeight: '150%',
        fontWeight: 300
      }
    ] as fontSizeConfig,
    'label-lg-semi': [
      '1.125rem',
      {
        lineHeight: '1.1875rem',
        fontWeight: 600,
        letterSpacing: '0.0225em'
      }
    ] as fontSizeConfig,
    'label-lg': [
      '1.125rem',
      {
        lineHeight: '106%',
        fontWeight: 500,
        letterSpacing: '0.02em'
      }
    ] as fontSizeConfig,
    'label-md-semi': [
      '1rem',
      {
        lineHeight: '106%',
        fontWeight: 600,
        letterSpacing: '0.02em'
      }
    ] as fontSizeConfig,
    'label-md': [
      '1rem',
      {
        lineHeight: '106%',
        fontWeight: 500,
        letterSpacing: '0.02em'
      }
    ] as fontSizeConfig,
    'label-sm-semi': [
      '0.875rem',
      {
        lineHeight: '107%',
        fontWeight: 600,
        letterSpacing: '0.02em'
      }
    ] as fontSizeConfig,
    'label-sm': [
      '0.875rem',
      {
        lineHeight: '107%',
        fontWeight: 500,
        letterSpacing: '0.02em'
      }
    ] as fontSizeConfig,
    'label-sm-light': [
      '0.875rem',
      {
        lineHeight: '107%',
        fontWeight: 400,
        letterSpacing: '0.02em'
      }
    ] as fontSizeConfig,
    'label-xs-semi': [
      '0.75rem',
      {
        lineHeight: '108%',
        fontWeight: 600,
        letterSpacing: '0.02em'
      }
    ] as fontSizeConfig,
    'label-xs': [
      '0.75rem',
      {
        lineHeight: '108%',
        fontWeight: 500,
        letterSpacing: '0.02em'
      }
    ] as fontSizeConfig,
    'caps-lg': [
      '1rem',
      {
        lineHeight: '112%',
        fontWeight: 600,
        letterSpacing: '0.06em'
      }
    ] as fontSizeConfig,
    'caps-md': [
      '0.875rem',
      {
        lineHeight: '114%',
        fontWeight: 600,
        letterSpacing: '0.06em'
      }
    ] as fontSizeConfig,
    'caps-sm': [
      '0.75rem',
      {
        lineHeight: '117%',
        fontWeight: 600,
        letterSpacing: '0.06em'
      }
    ] as fontSizeConfig
  },
  spacing: {
    0.25: '0.0625rem', // 1px
    0.75: '0.1875rem', // 3px
    1.25: '0.3125rem', // 5px
    2.25: '0.5625rem', // 9px
    2.75: '0.6875rem', // 11px
    3.25: '0.8125rem', // 13px
    3.75: '0.9375rem', //15px
    4.5: '1.125rem', // 18px
    6.5: '1.625rem', // 26px
    7.5: '1.875rem' // 30px
  }
}
export const theme = mergeLeft(themeExtension, defaultTheme)
