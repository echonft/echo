import type { HexString } from '@echo/utils/types/hex-string'

export interface AlchemyContract {
  address: Lowercase<HexString>
  chainId: number
  name: string | undefined
  symbol: string | undefined
  tokenType: 'ERC721' | 'ERC1155' | 'ERC20' | 'NATIVE'
}
