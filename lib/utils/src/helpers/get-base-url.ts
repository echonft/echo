import { isDev } from '@echo/utils/constants/is-dev'
import { isTest } from '@echo/utils/constants/is-test'

export function getBaseUrl() {
  if (isDev || isTest) {
    return 'http://localhost:3000'
  }
  return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
}
