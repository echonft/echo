import { AppEnvironment, serverConfig } from '../../lib/utils/config'

export const ironOptions = {
  cookieName: 'siwe',
  password: serverConfig().ironPassword,
  cookieOptions: {
    secure: serverConfig().appEnvironment === AppEnvironment.PROD,
  },
}
