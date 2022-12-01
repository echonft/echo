import { ServerConfig } from '../types/config'
import { getApiAppEnvironment } from './get-api-app-environment'
import { getIronPassword } from './get-iron-password'

export const serverConfig: ServerConfig = {
  environment: getApiAppEnvironment(),
  ironPassword: getIronPassword()
}
