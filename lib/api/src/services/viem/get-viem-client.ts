import { getViemAlchemyHttp } from '@echo/api/services/viem/get-viem-alchemy-http'
import { getViemChainById } from '@echo/api/services/viem/get-viem-chain-by-id'
import { createPublicClient } from 'viem'
import type { Chain } from 'viem/types/chain'

export function getViemClient(chainId: number) {
  const chain = getViemChainById(chainId)
  return createPublicClient({
    chain,
    // FIXME Typing
    transport: getViemAlchemyHttp(chain as unknown as Chain)
  })
}
