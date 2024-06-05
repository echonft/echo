import {
  CHAIN_BLAST,
  CHAIN_ETHEREUM,
  TESTNET_CHAIN_BLAST,
  TESTNET_CHAIN_SEPOLIA
} from '@echo/utils/constants/chains/chains'

export type ChainName =
  | typeof CHAIN_BLAST
  | typeof CHAIN_ETHEREUM
  | typeof TESTNET_CHAIN_BLAST
  | typeof TESTNET_CHAIN_SEPOLIA
