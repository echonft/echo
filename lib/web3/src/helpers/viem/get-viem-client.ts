import { getViemAlchemyHttp } from '@echo/web3/helpers/viem/get-viem-alchemy-http'
import type { Chain, PublicClient, Transport } from 'viem'
import { createPublicClient } from 'viem'

export function getViemClient(chain: Chain): PublicClient<Transport, Chain> {
  return createPublicClient({
    chain,
    transport: getViemAlchemyHttp(chain)
  }) as PublicClient<Transport, Chain>
}
