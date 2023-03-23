const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: '#EFF427'
      },
      fontFamily: {
        akira: ['var(--font-akira)', ...fontFamily.sans],
        nunito: ['var(--font-nunito)', ...fontFamily.sans]
      },
      fontSize: {
        h1: [
          '3.4375rem',
          {
            lineHeight: '2.9375rem',
            letterSpacing: '0.01rem',
            fontWeight: '800'
          }
        ],
        h2: [
          '3rem',
          {
            lineHeight: '2.9375rem',
            letterSpacing: '0.01rem',
            fontWeight: '800'
          }
        ],
        h3: [
          '2rem',
          {
            lineHeight: '1.6875rem',
            letterSpacing: '0.01rem',
            fontWeight: '800'
          }
        ],
        body1: [
          '1.5rem',
          {
            lineHeight: '1.3125rem',
            letterSpacing: '0.01rem',
            fontWeight: '800'
          }
        ],
        body2: [
          '1.25rem',
          {
            lineHeight: '1.9375rem',
            letterSpacing: '0.01rem',
            fontWeight: '700'
          }
        ],
        body3: [
          '1.125rem',
          {
            lineHeight: '1.75rem',
            letterSpacing: '0.01rem',
            fontWeight: '400'
          }
        ],
        body4: [
          '1rem',
          {
            lineHeight: '0.875rem',
            letterSpacing: '0.01rem',
            fontWeight: '500'
          }
        ],
        body5: [
          '1rem',
          {
            lineHeight: '1.5625rem',
            letterSpacing: '0.01rem',
            fontWeight: '700'
          }
        ],
        btn1: [
          '2rem',
          {
            lineHeight: '1.6875rem',
            letterSpacing: '0.01rem',
            fontWeight: '800'
          }
        ],
        btn2: [
          '1rem',
          {
            lineHeight: '1.5625rem',
            letterSpacing: '0.01rem',
            fontWeight: '800'
          }
        ],
        btn3: [
          '0.875rem',
          {
            lineHeight: '0.75rem',
            letterSpacing: '0.01rem',
            fontWeight: '700'
          }
        ]
      }
    }
  },
  plugins: []
}
