import { getApiAppEnvironment } from './get-api-app-environment'
import { getApiUrl } from './get-api-url'

export const getServerConfig = () => {
  const environment = getApiAppEnvironment()
  return {
    environment,
    url: getApiUrl(environment)
  }
}
