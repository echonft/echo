import type { ChainName } from '@echo/utils/types/chain-name'
import type { chains } from '@echo/web3/constants/chains'
import type { PublicClient, Transport } from 'viem'

export type ViemClient<T extends ChainName> = Omit<PublicClient<Transport, (typeof chains)[T]>, 'name'> & {
  readonly name: ChainName
}
