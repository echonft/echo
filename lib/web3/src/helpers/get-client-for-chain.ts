import type { ChainName } from '@echo/utils/types/chain-name'
import { CHAINS } from '@echo/web3/constants/chains'
import { getTransportForChain } from '@echo/web3/helpers/get-transport-for-chain'
import type { ViemClient } from '@echo/web3/types/viem-client'
import { createPublicClient } from 'viem'

export function getClientForChain(name: ChainName): ViemClient<typeof name> {
  const chain = CHAINS[name]
  return createPublicClient({
    chain,
    name,
    transport: getTransportForChain(chain)
  }) as ViemClient<typeof name>
}
