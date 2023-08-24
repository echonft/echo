import { TokenType } from './token-type'

export interface Contract {
  address: string
  chainId: number
  name: string | undefined
  symbol: string | undefined
  tokenType: TokenType
}
