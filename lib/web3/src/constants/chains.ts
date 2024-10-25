import type { Chain } from '@echo/model/constants/chain'
import type { Chain as ViemChain } from 'viem'
import { blast, blastSepolia, mainnet, sei, sepolia } from 'viem/chains'

export const chains: Record<Chain, ViemChain> = {
  blast,
  blast_sepolia: blastSepolia,
  ethereum: mainnet,
  sepolia,
  sei
} as const
