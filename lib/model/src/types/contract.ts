import type { TokenType } from '@echo/model/types/token-type'

export interface Contract {
  address: string
  chainId: number
  name?: string
  symbol?: string
  tokenType: TokenType
}
