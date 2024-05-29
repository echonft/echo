import type { ChainName } from '@echo/utils/types/chain-name'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export const EVM_TESTNET_CHAINS = ['blast_sepolia', 'sepolia'] as NonEmptyArray<ChainName>
export const EVM_MAINNET_CHAINS = ['ethereum', 'blast'] as NonEmptyArray<ChainName>
export const EVM_CHAINS = [...EVM_TESTNET_CHAINS, ...EVM_MAINNET_CHAINS] as NonEmptyArray<ChainName>
