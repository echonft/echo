import type { Chain } from '@echo/utils/constants/chain'
import type { chains } from '@echo/web3/constants/chains'
import type { PublicClient, Transport } from 'viem'

export type ViemClient<T extends Chain> = Omit<PublicClient<Transport, (typeof chains)[T]>, 'name'> & {
  readonly name: Chain
}
