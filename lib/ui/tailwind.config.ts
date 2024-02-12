// eslint-disable-next-line no-restricted-imports
import { themeExtension } from './src/helpers/theme/theme'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: themeExtension
  }
}
export default config
