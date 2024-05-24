import { MAINNET_CHAIN_ID, SEPOLIA_CHAIN_ID } from '@echo/utils/constants/chain-ids'

export function getChainName(chainId: number) {
  switch (chainId) {
    case MAINNET_CHAIN_ID:
      return 'eth-mainnet'
    case SEPOLIA_CHAIN_ID:
      return 'eth-sepolia'
    case 137:
      return 'polygon-mainnet'
    case 80001:
      return 'polygon-mumbai'
    case 10:
      return 'opt-mainnet'
    case 420:
      return 'opt-goerli'
    case 42161:
      return 'arb-mainnet'
    case 592:
      return 'astar-mainnet'
    default:
      throw Error(`chain id ${chainId} is not supported by Alchemy`)
  }
}
