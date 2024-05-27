import { TESTNET_CHAIN_SEPOLIA } from '@echo/utils/constants/chain-names'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'

export function echoAddressByChain(chain: ChainName): HexString {
  switch (chain) {
    case TESTNET_CHAIN_SEPOLIA:
      return '0xf7f19bf282a2260940c910F88eC70BbcF51Cf572'
    default:
      throw Error(`chain ${chain} not supported`)
  }
}
