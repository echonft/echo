import { TESTNET_CHAIN_SEPOLIA } from '@echo/utils/constants/chain-names'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'

export function echoAddressByChain(chain: ChainName): HexString {
  switch (chain) {
    case TESTNET_CHAIN_SEPOLIA:
      return '0xB0904D81440EFCA27Ec61948c95f21D7d546F8C3'
    default:
      throw Error(`chain ${chain} not supported`)
  }
}
