export const TESTNET_CHAIN_BLAST = 'blast_sepolia'
export const TESTNET_CHAIN_SEPOLIA = 'sepolia'
export const CHAIN_BLAST = 'blast'
export const CHAIN_ETHEREUM = 'ethereum'
export const TESTNET_CHAIN_NAMES = [TESTNET_CHAIN_BLAST, TESTNET_CHAIN_SEPOLIA] as const
export const MAINNET_CHAIN_NAMES = [CHAIN_BLAST, CHAIN_ETHEREUM] as const
export const CHAIN_NAMES = [...TESTNET_CHAIN_NAMES, ...MAINNET_CHAIN_NAMES] as const
