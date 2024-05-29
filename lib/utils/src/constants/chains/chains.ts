import type { ChainName } from '@echo/utils/types/chain-name'

export const TESTNET_CHAIN_BLAST = 'blast_sepolia'
export const TESTNET_CHAIN_SEPOLIA = 'sepolia'
export const CHAIN_BLAST = 'blast'
export const CHAIN_ETHEREUM = 'ethereum'
export const CHAINS = ['blast_sepolia', 'sepolia', 'blast', 'ethereum'] as const

export const CHAIN: Record<number, ChainName> = {
  81457: CHAIN_BLAST,
  168587773: TESTNET_CHAIN_BLAST,
  1: CHAIN_ETHEREUM,
  11155111: TESTNET_CHAIN_SEPOLIA
} as const
