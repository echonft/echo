import type { Chain } from '@echo/utils/constants/chain'
import { getTransport } from '@echo/web3/helpers/get-transport'
import { getViemChainByName } from '@echo/web3/helpers/get-viem-chain-by-name'
import type { ViemClient } from '@echo/web3/types/viem-client'
import { createPublicClient } from 'viem'

export async function getClientForChain(name: Chain): Promise<ViemClient<typeof name>> {
  const chain = getViemChainByName(name)
  const transport = await getTransport(chain)
  return createPublicClient({
    chain,
    name,
    transport
  }) as ViemClient<typeof name>
}
