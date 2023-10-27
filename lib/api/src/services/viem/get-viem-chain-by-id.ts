import { mainnet, sepolia } from 'viem/chains'

export function getViemChainById(chainId: number) {
  switch (chainId) {
    case 1:
      return mainnet
    case 11155111:
      return sepolia
    default:
      throw Error(`chain id ${chainId} is not supported`)
  }
}
