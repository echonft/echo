const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        banner: 'linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, #121212 100%)',
        'main-gradient': 'linear-gradient(95.27deg, #EFF427 7.68%, #8F27F5 100%)',
        'main-gradient/40': 'linear-gradient(95.27deg, rgba(239, 244, 39, 0.4) 7.68%, rgba(143, 39, 245, 0.4) 100%)'
      },
      borderWidth: {
        3: '3px'
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
            fontWeight: '700'
          }
        ],
        'display-lg-light': [
          '4rem',
          {
            lineHeight: '112%',
            fontWeight: '300'
          }
        ],
        'display-md': [
          '3rem',
          {
            lineHeight: '117%',
            fontWeight: '500'
          }
        ],
        'display-md-bold': [
          '3rem',
          {
            lineHeight: '117%',
            fontWeight: '700'
          }
        ],
        'display-md-light': [
          '3rem',
          {
            lineHeight: '117%',
            fontWeight: '300'
          }
        ],
        'display-sm': [
          '2rem',
          {
            lineHeight: '119%',
            fontWeight: '500'
          }
        ],
        'display-sm-light': [
          '2rem',
          {
            lineHeight: '119%',
            fontWeight: '300'
          }
        ],
        'header-lg-semi': [
          '2rem',
          {
            lineHeight: '119%',
            fontWeight: '600'
          }
        ],
        'header-lg': [
          '2rem',
          {
            lineHeight: '119%',
            fontWeight: '500'
          }
        ],
        'header-md-semi': [
          '1.5rem',
          {
            lineHeight: '125%',
            fontWeight: '600'
          }
        ],
        'header-md': [
          '1.5rem',
          {
            lineHeight: '125%',
            fontWeight: '500'
          }
        ],
        'header-sm-semi': [
          '1.25rem',
          {
            lineHeight: '120%',
            fontWeight: '600'
          }
        ],
        'header-sm': [
          '1.25rem',
          {
            lineHeight: '120%',
            fontWeight: '500'
          }
        ],
        'header-xs-semi': [
          '1rem',
          {
            lineHeight: '125%',
            fontWeight: '600'
          }
        ],
        'header-xs': [
          '1rem',
          {
            lineHeight: '125%',
            fontWeight: '500'
          }
        ],
        'paragraph-xl': [
          '1.25rem',
          {
            lineHeight: '140%',
            fontWeight: '500'
          }
        ],
        'paragraph-xl-light': [
          '1.25rem',
          {
            lineHeight: '140%',
            fontWeight: '300'
          }
        ],
        'paragraph-lg': [
          '1.125rem',
          {
            lineHeight: '144%',
            fontWeight: '500'
          }
        ],
        'paragraph-lg-light': [
          '1.125rem',
          {
            lineHeight: '144%',
            fontWeight: '300'
          }
        ],
        'paragraph-md': [
          '1rem',
          {
            lineHeight: '157%',
            fontWeight: '500'
          }
        ],
        'paragraph-md-light': [
          '1rem',
          {
            lineHeight: '157%',
            fontWeight: '300'
          }
        ],
        'paragraph-sm': [
          '0.875rem',
          {
            lineHeight: '157%',
            fontWeight: '500'
          }
        ],
        'paragraph-sm-light': [
          '0.875rem',
          {
            lineHeight: '157%',
            fontWeight: '300'
          }
        ],
        'paragraph-xs': [
          '0.75rem',
          {
            lineHeight: '150%',
            fontWeight: '500'
          }
        ],
        'paragraph-xs-light': [
          '0.75rem',
          {
            lineHeight: '150%',
            fontWeight: '500'
          }
        ],
        'label-lg-semi': [
          '1.125rem',
          {
            lineHeight: '106%',
            fontWeight: '600',
            letterSpacing: '0.02em'
          }
        ],
        'label-lg': [
          '1.125rem',
          {
            lineHeight: '106%',
            fontWeight: '500'
          }
        ],
        'label-md-semi': [
          '1rem',
          {
            lineHeight: '106%',
            fontWeight: '600',
            letterSpacing: '0.02em'
          }
        ],
        'label-md': [
          '1rem',
          {
            lineHeight: '106%',
            fontWeight: '500',
            letterSpacing: '0.02em'
          }
        ],
        'label-sm-semi': [
          '0.875rem',
          {
            lineHeight: '107%',
            fontWeight: '600',
            letterSpacing: '0.02em'
          }
        ],
        'label-sm': [
          '0.875rem',
          {
            lineHeight: '107%',
            fontWeight: '500',
            letterSpacing: '0.02em'
          }
        ],
        'label-xs-semi': [
          '0.75rem',
          {
            lineHeight: '108%',
            fontWeight: '600',
            letterSpacing: '0.02em'
          }
        ],
        'label-xs': [
          '0.75rem',
          {
            lineHeight: '108%',
            fontWeight: '500',
            letterSpacing: '0.02em'
          }
        ],
        'caps-lg': [
          '1rem',
          {
            lineHeight: '112%',
            fontWeight: '600',
            letterSpacing: '0.06em'
          }
        ],
        'caps-md': [
          '0.875rem',
          {
            lineHeight: '114%',
            fontWeight: '600',
            letterSpacing: '0.06em'
          }
        ],
        'caps-sm': [
          '0.75rem',
          {
            lineHeight: '117%',
            fontWeight: '600',
            letterSpacing: '0.06em'
          }
        ]
      },
      spacing: {
        4.5: '1.125rem'
      }
    }
  },
  plugins: [require('@headlessui/tailwindcss')]
}
