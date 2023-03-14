import { ApiEnvironment } from '../types/config'
import { serverConfig } from './server-config'

export const ironOptions = {
  cookieName: 'siwe',
  password: serverConfig.ironPassword,
  cookieOptions: {
    secure: serverConfig.environment === ApiEnvironment.PROD
  }
}
