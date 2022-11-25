import { ApiEnvironment, serverConfig } from '../config/config'

export const ironOptions = {
  cookieName: 'siwe',
  password: serverConfig.ironPassword,
  cookieOptions: {
    secure: serverConfig.environment === ApiEnvironment.PROD
  }
}
