import { getAlchemyApiKey } from '@echo/alchemy/helpers/get-alchemy-api-key'

function getChainName(chainId: number) {
  switch (chainId) {
    case 1:
      return 'eth-mainnet'
    case 11155111:
      return 'eth-sepolia'
    case 5:
      return 'eth-goerli'
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
export function getAlchemyBaseUrl(chainId: number) {
  return `https://${getChainName(chainId)}.g.alchemy.com/nft/v3/${getAlchemyApiKey()}/`
}
