import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { getViemAlchemyHttp } from '@echo/web3/helpers/viem/get-viem-alchemy-http'
import type { Chain, PublicClient, Transport } from 'viem'
import { createPublicClient } from 'viem'

export function getViemClient(chainId: number): PublicClient<Transport, Chain> {
  const chain = getChainById(chainId)
  return createPublicClient({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    chain,
    transport: getViemAlchemyHttp(chain)
  }) as PublicClient<Transport, Chain>
}
