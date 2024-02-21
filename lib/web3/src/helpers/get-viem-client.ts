import { getAlchemyTransportUrl } from '@echo/alchemy/helpers/get-alchemy-transport-url'
import { type Chain, createPublicClient, fallback, http, type PublicClient, type Transport, webSocket } from 'viem'

export function getViemClient(chain: Chain): PublicClient<Transport, typeof chain> {
  return createPublicClient({
    chain,
    transport: fallback(
      [webSocket(`wss://${getAlchemyTransportUrl(chain.id)}`), http(`https://${getAlchemyTransportUrl(chain.id)}`)],
      { rank: true }
    )
  })
}
