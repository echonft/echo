import { ApiEnvironment } from '../types/config/api-environment'
import { isNilOrEmpty } from '@echo/utils'
import * as process from 'process'

/**
 * Get the URL for the API. Required for network calls from FE and Bot
 */
export function getApiUrl(env: ApiEnvironment): string {
  if (env === ApiEnvironment.DEV) {
    const devUrl = process.env.NEXTAUTH_URL_INTERNAL
    if (isNilOrEmpty(devUrl)) {
      throw new Error('.env should contain NEXTAUTH_URL_INTERNAL')
    }
    return devUrl
  } else {
    const prodUrl = process.env.NEXTAUTH_URL
    if (isNilOrEmpty(prodUrl)) {
      throw new Error('.env should contain NEXTAUTH_URL')
    }
    return prodUrl
  }
}
