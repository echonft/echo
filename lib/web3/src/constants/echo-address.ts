import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'

export function echoAddressByChain(chain: ChainName): HexString {
  switch (chain) {
    case 'sepolia':
      return '0xf7f19bf282a2260940c910F88eC70BbcF51Cf572'
    default:
      throw Error(`chain ${chain} not supported`)
  }
}
