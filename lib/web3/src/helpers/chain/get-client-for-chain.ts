import type { ChainName } from '@echo/utils/types/chain-name'
import { getViemChainByName } from '@echo/web3/helpers/chain/get-viem-chain-by-name'
import { getTransportForChain } from '@echo/web3/helpers/get-transport-for-chain'
import type { ViemClient } from '@echo/web3/types/viem-client'
import { createPublicClient } from 'viem'

export async function getClientForChain(name: ChainName): Promise<ViemClient<typeof name>> {
  const chain = getViemChainByName(name)
  const transport = await getTransportForChain(chain)
  return createPublicClient({
    chain,
    name,
    transport
  }) as ViemClient<typeof name>
}
