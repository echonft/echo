import { MAINNET_CHAIN_NAMES, TESTNET_CHAIN_NAMES } from '@echo/utils/constants/chain-names'
import { isTestnet } from '@echo/utils/constants/is-testnet'

export const SUPPORTED_CHAINS = isTestnet ? TESTNET_CHAIN_NAMES : MAINNET_CHAIN_NAMES
