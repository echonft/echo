import { isEmpty, isNil } from 'ramda'
import { Chain, goerli, mainnet } from 'wagmi'

interface Config {
  chains: Chain[]
  alchemyKey: string
  useMock: boolean
  useTestnet: boolean
}

function getUseTestnet(): boolean {
  return process.env.NEXT_PUBLIC_CHAIN_ID === 'true'
}

function getAlchemyKey(): string {
  const useTestnet = getUseTestnet()
  if (useTestnet) {
    const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_GOERLI
    if (isNil(alchemyKey) || isEmpty(alchemyKey)) {
      throw new Error('.env should contain NEXT_PUBLIC_ALCHEMY_API_KEY_GOERLI when using testnet')
    }
    return alchemyKey
  } else {
    const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_MAINNET
    if (isNil(alchemyKey) || isEmpty(alchemyKey)) {
      throw new Error('.env should contain NEXT_PUBLIC_ALCHEMY_API_KEY_MAINNET when using mainnet')
    }
    return alchemyKey
  }
}

function getConfig(): Config {
  const useTestnet = getUseTestnet()
  if (useTestnet) {
    const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_GOERLI
    if (isNil(alchemyKey) || isEmpty(alchemyKey)) {
      throw new Error('.env should contain NEXT_PUBLIC_ALCHEMY_API_KEY_GOERLI when using testnet')
    }
  } else {
    const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_MAINNET
    if (isNil(alchemyKey) || isEmpty(alchemyKey)) {
      throw new Error('.env should contain NEXT_PUBLIC_ALCHEMY_API_KEY_MAINNET when using mainnet')
    }
  }

  return {
    chains: getUseTestnet() ? [goerli] : [mainnet],
    alchemyKey: getAlchemyKey(),
    useTestnet,
    useMock: process.env.NEXT_PUBLIC_MOCK === 'true'
  }
}

export const config: Config = getConfig()
