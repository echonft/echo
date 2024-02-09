import { themeExtension } from '@echo/ui/helpers/theme/theme'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: themeExtension
  }
}
export default config
