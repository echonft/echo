import { isEmpty, isNil } from 'rambda'

interface ServerConfig {
  environment: ApiEnvironment
  ironPassword: string
}

export enum ApiEnvironment {
  PROD = 'prod',
  DEV = 'dev'
}

function getApiAppEnvironment(): ApiEnvironment {
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

function getIronPassword(): string {
  const ironPassword = process.env.IRON_PASSWORD
  if (isNil(ironPassword) || isEmpty(ironPassword)) {
    throw new Error('.env should contain IRON_PASSWORD')
  }
  return ironPassword
}

export const serverConfig: ServerConfig = {
  environment: getApiAppEnvironment(),
  ironPassword: getIronPassword()
}
