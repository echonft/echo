import { isEmpty, isNil } from 'ramda'
import { Chain, chain } from 'wagmi'
/* eslint-disable no-console */

interface Config {
  appEnvironment: AppEnvironment
  chains: Chain[]
  alchemyKey: string
  useTestnet: boolean
}

export enum AppEnvironment {
  PROD = 'prod',
  DEV = 'dev',
  MOCK = 'mock'
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
  const useTestnet = getUseTestnet()
  if (useTestnet) {
    if (
      isNil(process.env.NEXT_PUBLIC_ALCHEMY_TESTNET_API_KEY) ||
      isEmpty(process.env.NEXT_PUBLIC_ALCHEMY_TESTNET_API_KEY)
    ) {
      throw new Error('.env should contain NEXT_PUBLIC_ALCHEMY_TESTNET_API_KEY when using testnet')
    }
  } else {
    if (isNil(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) || isEmpty(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)) {
      throw new Error('.env should contain NEXT_PUBLIC_ALCHEMY_API_KEY when using mainnet')
    }
  }

  return {
    appEnvironment: getAppEnvironment(),
    chains: getUseTestnet() ? [chain.goerli] : [chain.mainnet],
    useTestnet,
    alchemyKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  }
}
