import type { ChainName } from '@echo/utils/types/chain-name'
import type { Chain } from 'viem'
import { blast, blastSepolia, mainnet, sepolia } from 'viem/chains'

export const CHAINS: Record<ChainName, Chain> = {
  blast: blast,
  blast_sepolia: blastSepolia,
  ethereum: mainnet,
  sepolia: sepolia
} as const
