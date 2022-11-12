import { isEmpty, isNil } from 'ramda'
import { Chain, chain } from 'wagmi'

/* eslint-disable no-console */
interface Config {
  appEnvironment: AppEnvironment
  chains: Chain[]
  alchemyKey: string
  useTestnet: boolean
}

interface ServerConfig {
  appEnvironment: AppEnvironment
  ironPassword: string
}

export enum AppEnvironment {
  PROD = 'prod',
  DEV = 'dev',
  MOCK = 'mock',
}

function getAppEnvironment(): AppEnvironment {
  const env = process.env.NEXT_PUBLIC_APP_ENV?.toLowerCase()
  switch (env) {
    case 'production':
      console.info('Environment: production')
      return AppEnvironment.PROD
    case 'development':
      console.info('Environment: development')
      return AppEnvironment.DEV
    case 'mock':
      console.warn('Environment: mock')
      return AppEnvironment.MOCK
    default:
      if (process.env.NODE_ENV === 'production') {
        console.info('Environment: production')
        return AppEnvironment.PROD
      } else {
        console.info('Environment: development')
        return AppEnvironment.DEV
      }
  }
}

function getUseTestnet(): boolean {
  if (process.env.NEXT_PUBLIC_TESTNET?.toLowerCase() === 'true') {
    console.log('Chain: Testnet')
    return true
  } else {
    console.log('Chain: Mainnet')
    return false
  }
}

export const config = (): Config => {
  if (isNil(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)) {
    throw new Error('.env should contain NEXT_PUBLIC_ALCHEMY_API_KEY')
  }
  return {
    appEnvironment: getAppEnvironment(),
    chains: getUseTestnet() ? [chain.goerli] : [chain.mainnet],
    useTestnet: getUseTestnet(),
    alchemyKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  }
}

function getApiAppEnvironment(): AppEnvironment {
  const env = process.env.API_APP_ENV?.toLowerCase()
  switch (env) {
    case 'production':
      return AppEnvironment.PROD
    case 'development':
      return AppEnvironment.DEV
    case 'mock':
      return AppEnvironment.MOCK
    default:
      if (process.env.NODE_ENV === 'production') {
        return AppEnvironment.PROD
      } else {
        return AppEnvironment.DEV
      }
  }
}

export const serverConfig = (): ServerConfig => {
  if (isNil(process.env.IRON_PASSWORD) || isEmpty(process.env.IRON_PASSWORD)) {
    throw new Error('.env should contain IRON_PASSWORD')
  }
  return {
    appEnvironment: getApiAppEnvironment(),
    ironPassword: process.env.IRON_PASSWORD,
  }
}
