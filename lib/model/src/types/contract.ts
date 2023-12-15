import { type TokenType } from '@echo/model/types/token-type'
import type { HexString } from '@echo/utils/types/hex-string'

export interface Contract {
  address: Lowercase<HexString>
  chainId: number
  name?: string
  symbol?: string
  tokenType: TokenType
}
