import type { ChainName } from '@echo/utils/types/chain-name'

export const BLAST_CHAIN_ID = 81457
export const BLAST_SEPOLIA_CHAIN_ID = 168587773
export const ETHEREUM_CHAIN_ID = 1
export const SEPOLIA_CHAIN_ID = 11155111

export const CHAIN_IDS = [BLAST_CHAIN_ID, BLAST_SEPOLIA_CHAIN_ID, ETHEREUM_CHAIN_ID, SEPOLIA_CHAIN_ID] as const

export const CHAIN_ID: Record<ChainName, number> = {
  blast: BLAST_CHAIN_ID,
  blast_sepolia: BLAST_SEPOLIA_CHAIN_ID,
  ethereum: ETHEREUM_CHAIN_ID,
  sepolia: SEPOLIA_CHAIN_ID
} as const
