import {
  blastChainId,
  blastSepoliaChainId,
  ethereumChainId,
  sepoliaChainId
} from '@echo/utils/helpers/chains/chain-ids'
import { getSecret } from '@echo/utils/services/secret-manager'
import { isNil } from 'ramda'
import { type Chain, fallback, http, webSocket } from 'viem'

function alchemyChainName(chainId: number) {
  switch (chainId) {
    case ethereumChainId():
      return 'eth-mainnet'
    case sepoliaChainId():
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

async function alchemyTransportUrl(chainId: number) {
  const apiKey = await getSecret('ALCHEMY_API_KEY')
  if (isNil(apiKey)) {
    throw Error('could not fetch ALCHEMY_API_KEY')
  }
  return `${alchemyChainName(chainId)}.g.alchemy.com/v2/${apiKey}`
}

export async function getTransportForChain(chain: Chain) {
  const chainId = chain.id
  if (chainId === blastSepoliaChainId() || chainId === blastChainId()) {
    const endpoint = await getSecret('QUICKNODE_BLAST_ENDPOINT')
    return fallback([webSocket(`wss://${endpoint}`), http(`https://${endpoint}`)], { rank: true })
  }
  const transportUrl = await alchemyTransportUrl(chainId)
  return fallback([webSocket(`wss://${transportUrl}`), http(`https://${transportUrl}`)], { rank: true })
}
