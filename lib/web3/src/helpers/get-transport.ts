import {
  blastChainId,
  blastSepoliaChainId,
  ethereumChainId,
  seiChainId,
  sepoliaChainId
} from '@echo/utils/helpers/chains/chain-ids'
import { getSecret } from '@echo/utils/services/secret-manager'
import { isNil } from 'ramda'
import {
  type Chain,
  fallback,
  type FallbackTransport,
  http,
  type HttpTransport,
  webSocket,
  type WebSocketTransport
} from 'viem'

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
  const apiKey = await getSecret({ name: 'ALCHEMY_API_KEY' })
  if (isNil(apiKey)) {
    throw Error('could not fetch ALCHEMY_API_KEY')
  }
  return `${alchemyChainName(chainId)}.g.alchemy.com/v2/${apiKey}`
}

export async function getTransport(chain: Chain): Promise<FallbackTransport<[WebSocketTransport, HttpTransport]>> {
  const chainId = chain.id
  const config = { rank: true, retryCount: 10, retryDelay: 1200 }
  if (chainId === blastSepoliaChainId() || chainId === blastChainId()) {
    const endpoint = await getSecret({ name: 'QUICKNODE_BLAST_ENDPOINT' })
    return fallback([webSocket(`wss://${endpoint}`), http(`https://${endpoint}`)], config)
  }
  if (chainId === seiChainId()) {
    return fallback([webSocket('wss://evm-ws.sei-apis.com'), http('https://evm-rpc.sei-apis.com')], config)
  }
  const transportUrl = await alchemyTransportUrl(chainId)
  return fallback([webSocket(`wss://${transportUrl}`), http(`https://${transportUrl}`)], config)
}
