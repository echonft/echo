import { serverConfig } from '../config'
import { ApiEnvironment } from '../types/config'

export const ironOptions = {
  cookieName: 'siwe',
  password: serverConfig.ironPassword,
  cookieOptions: {
    secure: serverConfig.environment === ApiEnvironment.PROD
  }
}

export * from './verify-signature'
