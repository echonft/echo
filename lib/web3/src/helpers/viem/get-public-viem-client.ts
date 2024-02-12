import { getAlchemyPublicTransportUrl } from '@echo/alchemy/helpers/get-alchemy-public-transport-url'
import { type Chain, createPublicClient, type PublicClient, webSocket, type WebSocketTransport } from 'viem'

export function getPublicViemClient(chain: Chain): PublicClient<WebSocketTransport, typeof chain> {
  return createPublicClient({
    batch: {
      multicall: true
    },
    chain,
    transport: webSocket(getAlchemyPublicTransportUrl(chain.id))
  })
}
