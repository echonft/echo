import type { Config } from 'tailwindcss'
import { themeExtension } from './src/helpers/theme/theme'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: themeExtension
  }
}
export default config
