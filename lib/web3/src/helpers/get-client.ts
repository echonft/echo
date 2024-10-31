import { Chain } from '@echo/model/constants/chain'
import { Secret } from '@echo/utils/constants/secret'
import { getSecret } from '@echo/utils/services/secret-manager'
import { chains } from '@echo/web3/constants/chains'
import { TransportError } from '@echo/web3/constants/errors/transport-error'
import type { ViemClient } from '@echo/web3/types/viem-client'
import { prop } from 'ramda'
import {
  createPublicClient,
  fallback,
  type FallbackTransport,
  http,
  type HttpTransport,
  webSocket,
  type WebSocketTransport
} from 'viem'

function alchemyChainName(chain: Chain) {
  switch (chain) {
    case Chain.Ethereum:
      return 'eth-mainnet'
    case Chain.Sepolia:
      return 'eth-sepolia'
    default:
      throw Error(TransportError.AlchemyUnsupported)
  }
}

async function alchemyTransportUrl(chain: Chain) {
  const apiKey = await getSecret(Secret.AlchemyApiKey)
  return `${alchemyChainName(chain)}.g.alchemy.com/v2/${apiKey}`
}

async function getTransport(chain: Chain): Promise<FallbackTransport<[WebSocketTransport, HttpTransport]>> {
  const config = { rank: true, retryCount: 10, retryDelay: 1200 }
  if (chain == Chain.BlastSepolia || chain == Chain.Blast) {
    const endpoint = await getSecret(Secret.QuicknodeBlastEndpoint)
    return fallback([webSocket(`wss://${endpoint}`), http(`https://${endpoint}`)], config)
  }
  if (chain === Chain.Sepolia) {
    return fallback([webSocket('wss://evm-ws.sei-apis.com'), http('https://evm-rpc.sei-apis.com')], config)
  }
  // FIXME Set the proper values here, we have a private endpoint
  if (chain === Chain.Sei) {
    return fallback([webSocket('wss://evm-ws.sei-apis.com'), http('https://evm-rpc.sei-apis.com')], config)
  }
  const transportUrl = await alchemyTransportUrl(chain)
  return fallback([webSocket(`wss://${transportUrl}`), http(`https://${transportUrl}`)], config)
}

export async function getClient(chain: Chain): Promise<ViemClient<typeof chain>> {
  // const chain = prop(name, chains)
  const transport = await getTransport(chain)
  return createPublicClient({
    chain: prop(chain, chains),
    name: chain,
    transport
  }) as ViemClient<typeof chain>
}
