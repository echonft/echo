import type { ChainName } from '@echo/utils/types/chain-name'
import { getViemChainByName } from '@echo/web3/helpers/chain/get-viem-chain-by-name'
import { getTransport } from '@echo/web3/helpers/get-transport'
import type { ViemClient } from '@echo/web3/types/viem-client'
import { createPublicClient } from 'viem'

export async function getClientForChain(name: ChainName): Promise<ViemClient<typeof name>> {
  const chain = getViemChainByName(name)
  const transport = await getTransport(chain)
  return createPublicClient({
    chain,
    name,
    transport
  }) as ViemClient<typeof name>
}
