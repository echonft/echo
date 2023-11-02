import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { getViemAlchemyHttp } from '@echo/web3/helpers/get-viem-alchemy-http'
import { createPublicClient } from 'viem'
import type { PublicClient } from 'viem/clients/createPublicClient'
import type { Transport } from 'viem/clients/transports/createTransport'
import type { Chain } from 'viem/types/chain'

export function getViemClient(chainId: number): PublicClient<Transport, Chain> {
  const chain = getChainById(chainId)
  return createPublicClient({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    chain,
    transport: getViemAlchemyHttp(chain)
  }) as PublicClient<Transport, Chain>
}
