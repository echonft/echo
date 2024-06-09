import { isDev } from '@echo/utils/constants/is-dev'

export function getBaseUrl() {
  if (isDev) {
    return 'http://localhost:3000'
  }
  return process.env.NEXT_PUBLIC_VERCEL_URL
}
