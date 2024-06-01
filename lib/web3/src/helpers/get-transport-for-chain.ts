import {
  BLAST_CHAIN_ID,
  BLAST_SEPOLIA_CHAIN_ID,
  ETHEREUM_CHAIN_ID,
  SEPOLIA_CHAIN_ID
} from '@echo/utils/constants/chains/chain-ids'
import { type Chain, fallback, http, webSocket } from 'viem'

function alchemyChainName(chainId: number) {
  switch (chainId) {
    case ETHEREUM_CHAIN_ID:
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

function alchemyTransportUrl(chainId: number) {
  return `${alchemyChainName(chainId)}.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
}

export const getTransportForChain = (chain: Chain) => {
  const chainId = chain.id
  if (chainId === BLAST_SEPOLIA_CHAIN_ID || chainId === BLAST_CHAIN_ID) {
    return fallback(
      [
        webSocket(`wss://${process.env.QUICKNODE_BLAST_ENDPOINT}`),
        http(`https://${process.env.QUICKNODE_BLAST_ENDPOINT}`)
      ],
      { rank: true }
    )
  }
  return fallback(
    [webSocket(`wss://${alchemyTransportUrl(chainId)}`), http(`https://${alchemyTransportUrl(chainId)}`)],
    { rank: true }
  )
}
