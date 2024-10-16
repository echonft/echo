import type { ChainName } from '@echo/utils/types/chain-name'
import type { Chain } from 'viem'
import { blast, blastSepolia, mainnet, sei, sepolia } from 'viem/chains'

export const chains: Record<ChainName, Chain> = {
  blast,
  blast_sepolia: blastSepolia,
  ethereum: mainnet,
  sepolia,
  sei
} as const
