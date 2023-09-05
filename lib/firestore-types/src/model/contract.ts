import { TokenType } from './token-type'

export interface Contract {
  address: string
  chainId: number
  name?: string
  symbol?: string
  tokenType: TokenType
}
