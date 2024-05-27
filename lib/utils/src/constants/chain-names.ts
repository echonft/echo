import { isTestnet } from '@echo/utils/constants/is-testnet'

export const TESTNET_CHAIN_BLAST = 'blast_sepolia'
export const TESTNET_CHAIN_SEPOLIA = 'sepolia'
export const CHAIN_BLAST = 'blast'
export const CHAIN_ETHEREUM = 'ethereum'
export const TESTNET_CHAIN_NAMES = [TESTNET_CHAIN_SEPOLIA, TESTNET_CHAIN_BLAST] as const
export const MAINNET_CHAIN_NAMES = [CHAIN_ETHEREUM, CHAIN_BLAST] as const
export const EVM_TESTNET_CHAIN_NAMES = [TESTNET_CHAIN_SEPOLIA, TESTNET_CHAIN_BLAST] as const
export const EVM_MAINNET_CHAIN_NAMES = [CHAIN_ETHEREUM, CHAIN_BLAST] as const
export const EVM_CHAIN_NAMES = [...EVM_TESTNET_CHAIN_NAMES, ...EVM_MAINNET_CHAIN_NAMES] as const
export const CHAIN_NAMES = [...TESTNET_CHAIN_NAMES, ...MAINNET_CHAIN_NAMES] as const
export const SUPPORTED_CHAINS = isTestnet ? TESTNET_CHAIN_NAMES : MAINNET_CHAIN_NAMES
export const SUPPORTED_EVM_CHAINS = isTestnet ? EVM_TESTNET_CHAIN_NAMES : EVM_MAINNET_CHAIN_NAMES
