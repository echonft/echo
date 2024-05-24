export const TESTNET_CHAIN_NAMES = ['blast_sepolia', 'sepolia'] as const
export const NON_TESTNET_CHAIN_NAME = ['blast', 'ethereum'] as const
export const CHAIN_NAMES = [...TESTNET_CHAIN_NAMES, ...NON_TESTNET_CHAIN_NAME] as const
