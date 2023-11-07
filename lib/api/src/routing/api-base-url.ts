import { isDev } from '@echo/utils/constants/is-dev'

export function apiBaseUrl() {
  if (isDev) {
    return 'http://localhost:3000/api'
  }
  return `https://${process.env.VERCEL_URL}/api`
}
