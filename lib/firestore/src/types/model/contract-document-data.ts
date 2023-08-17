import { TokenType } from './token-type'

export interface ContractDocumentData {
  address: string
  chainId: number
  name?: string
  symbol?: string
  tokenType: TokenType
}
