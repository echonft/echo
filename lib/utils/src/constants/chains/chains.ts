import { MAINNET_CHAINS } from '@echo/utils/constants/chains/mainnet-chains'
import { TESTNET_CHAINS } from '@echo/utils/constants/chains/testnet-chains'
import type { ChainName } from '@echo/utils/types/chain-name'

export const TESTNET_CHAIN_BLAST = 'blast_sepolia'
export const TESTNET_CHAIN_SEPOLIA = 'sepolia'
export const CHAIN_BLAST = 'blast'
export const CHAIN_ETHEREUM = 'ethereum'
export const CHAINS = [...TESTNET_CHAINS, ...MAINNET_CHAINS] as const

export const CHAIN: Record<number, ChainName> = {
  81457: CHAIN_BLAST,
  168587773: TESTNET_CHAIN_BLAST,
  1: CHAIN_ETHEREUM,
  11155111: TESTNET_CHAIN_SEPOLIA
} as const
