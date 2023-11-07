import { isDev } from '@echo/utils/constants/is-dev'

export function baseUrl() {
  if (isDev) {
    return 'http://localhost:3000/en'
  }
  return `https://${process.env.VERCEL_URL}/en`
}
