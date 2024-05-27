import { TESTNET_CHAIN_SEPOLIA } from '@echo/utils/constants/chain-names'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'

export function echoAddressByChain(chain: ChainName): HexString {
  switch (chain) {
    case TESTNET_CHAIN_SEPOLIA:
      return '0x76FBe909020c1B133b3Be0347Fe4136734D3ac8a'
    default:
      throw Error(`chain ${chain} not supported`)
  }
}
