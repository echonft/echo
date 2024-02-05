import { getAlchemyTransportUrl } from '@echo/alchemy/helpers/get-alchemy-transport-url'
import { type Chain, createPublicClient, type PublicClient, webSocket, type WebSocketTransport } from 'viem'

export function getViemClient(chain: Chain): PublicClient<WebSocketTransport, typeof chain> {
  return createPublicClient({
    batch: {
      multicall: true
    },
    chain,
    transport: webSocket(getAlchemyTransportUrl(chain.id))
  })
}
