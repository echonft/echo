import {
  CHAIN_BLAST,
  CHAIN_ETHEREUM,
  TESTNET_CHAIN_BLAST,
  TESTNET_CHAIN_SEPOLIA
} from '@echo/utils/constants/chains/chains'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export const EVM_TESTNET_CHAINS = [TESTNET_CHAIN_BLAST, TESTNET_CHAIN_SEPOLIA] as NonEmptyArray<ChainName>
export const EVM_MAINNET_CHAINS = [CHAIN_ETHEREUM, CHAIN_BLAST] as NonEmptyArray<ChainName>
export const EVM_CHAINS = [...EVM_TESTNET_CHAINS, ...EVM_MAINNET_CHAINS] as NonEmptyArray<ChainName>
