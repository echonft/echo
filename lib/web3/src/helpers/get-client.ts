import type { Chain } from '@echo/model/constants/chain'
import { chains } from '@echo/web3/constants/chains'
import { getTransport } from '@echo/web3/helpers/get-transport'
import type { ViemClient } from '@echo/web3/types/viem-client'
import { prop } from 'ramda'
import { createPublicClient } from 'viem'

export async function getClient(chain: Chain): Promise<ViemClient<typeof chain>> {
  // const chain = prop(name, chains)
  const transport = await getTransport(chain)
  return createPublicClient({
    chain: prop(chain, chains),
    name: chain,
    transport
  }) as ViemClient<typeof chain>
}
