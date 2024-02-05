import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'

export interface AlchemyContract {
  address: Lowercase<HexString>
  chainId: number
  name: Nullable<string>
  symbol: Nullable<string>
  tokenType: 'ERC721' | 'ERC1155' | 'ERC20' | 'NATIVE'
}
