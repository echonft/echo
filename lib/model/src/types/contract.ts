import { TokenType } from './token-type'

export interface Contract {
  id: string
  address: string
  chainId: number
  tokenType: TokenType
  name?: string
  symbol?: string
}
