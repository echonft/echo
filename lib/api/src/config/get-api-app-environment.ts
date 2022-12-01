import { ApiEnvironment } from '../types/config'

export function getApiAppEnvironment(): ApiEnvironment {
  const env = process.env.API_ENV?.toLowerCase()
  switch (env) {
    case 'production':
      return ApiEnvironment.PROD
    case 'development':
      return ApiEnvironment.DEV
    default:
      if (process.env.NODE_ENV === 'production') {
        return ApiEnvironment.PROD
      } else {
        return ApiEnvironment.DEV
      }
  }
}
