import { Chain } from '@echo/utils/constants/chain'
import { getChain } from '@echo/utils/helpers/chains/get-chain'
import { getSecret } from '@echo/utils/services/secret-manager'
import { isNil } from 'ramda'
import {
  type Chain as ViemChain,
  fallback,
  type FallbackTransport,
  http,
  type HttpTransport,
  webSocket,
  type WebSocketTransport
} from 'viem'

function alchemyChainName(chainId: number) {
  const chain = getChain(chainId)
  switch (chain) {
    case Chain.Ethereum:
      return 'eth-mainnet'
    case Chain.Sepolia:
      return 'eth-sepolia'
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

export async function getTransport(chain: ViemChain): Promise<FallbackTransport<[WebSocketTransport, HttpTransport]>> {
  const chainName = getChain(chain.id)
  const config = { rank: true, retryCount: 10, retryDelay: 1200 }
  if (chainName == Chain.BlastSepolia || chainName == Chain.Blast) {
    const endpoint = await getSecret({ name: 'QUICKNODE_BLAST_ENDPOINT' })
    return fallback([webSocket(`wss://${endpoint}`), http(`https://${endpoint}`)], config)
  }
  if (chainName === Chain.Sepolia) {
    return fallback([webSocket('wss://evm-ws.sei-apis.com'), http('https://evm-rpc.sei-apis.com')], config)
  }
  const transportUrl = await alchemyTransportUrl(chain.id)
  return fallback([webSocket(`wss://${transportUrl}`), http(`https://${transportUrl}`)], config)
}
