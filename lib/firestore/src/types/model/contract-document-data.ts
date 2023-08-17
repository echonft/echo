import { TokenType } from './token-type'

export interface ContractDocumentData {
  address: string
  addressLowercase: string
  chainId: number
  name: string | undefined
  symbol: string | undefined
  tokenType: TokenType
}
