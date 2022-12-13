import { ApiEnvironment } from '../types/config'
import { serverConfig } from './server-config'

/**
 * Get the URL for the API. Required for network calls from FE and Bot
 */
export function getApiUrl(): string {
  return serverConfig.environment === ApiEnvironment.DEV ? 'http://localhost:3000' : 'https://echonft.xyz'
}
