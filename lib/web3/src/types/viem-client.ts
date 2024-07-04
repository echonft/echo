import type { ChainName } from '@echo/utils/types/chain-name'
import type { Chain, PublicClient, Transport } from 'viem'
import { blast, blastSepolia, mainnet, sepolia } from 'viem/chains'

const chains: Record<ChainName, Chain> = {
  blast: blast,
  blast_sepolia: blastSepolia,
  ethereum: mainnet,
  sepolia: sepolia
} as const
export type ViemClient<T extends ChainName> = Omit<PublicClient<Transport, (typeof chains)[T]>, 'name'> & {
  readonly name: ChainName
}
