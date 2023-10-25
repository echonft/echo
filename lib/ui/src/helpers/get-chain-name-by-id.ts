import { isDev } from '@echo/utils/constants/is-dev'

export function getChainNameById(chainId: number) {
  switch (chainId) {
    case 1:
      return 'Ethereum'
    case 11155111:
      if (isDev) {
        return 'Sepolia'
      }
      throw Error(`chain ${chainId} not supported`)
    default:
      throw Error(`chain ${chainId} not supported`)
  }
}
