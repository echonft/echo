import { isDev } from '@echo/utils/constants/is-dev'
import { isTest } from '@echo/utils/constants/is-test'
import { getProductionUrl } from '@echo/utils/helpers/get-production-url'

export function getBaseUrl() {
  if (isDev || isTest) {
    return 'http://localhost:3000'
  }
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }
  return getProductionUrl()
}
