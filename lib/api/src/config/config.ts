import { isEmpty, isNil } from 'ramda'

interface ServerConfig {
  environment: ApiAppEnvironment
  ironPassword: string
}

export enum ApiAppEnvironment {
  PROD = 'prod',
  DEV = 'dev'
}

function getApiAppEnvironment(): ApiAppEnvironment {
  const env = process.env.API_APP_ENV?.toLowerCase()
  switch (env) {
    case 'production':
      return ApiAppEnvironment.PROD
    case 'development':
      return ApiAppEnvironment.DEV
    default:
      if (process.env.NODE_ENV === 'production') {
        return ApiAppEnvironment.PROD
      } else {
        return ApiAppEnvironment.DEV
      }
  }
}

export const serverConfig = (): ServerConfig => {
  if (isNil(process.env.IRON_PASSWORD) || isEmpty(process.env.IRON_PASSWORD)) {
    throw new Error('.env should contain IRON_PASSWORD')
  }
  return {
    environment: getApiAppEnvironment(),
    ironPassword: process.env.IRON_PASSWORD
  }
}
