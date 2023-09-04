import { TokenType } from '@echo/firestore-types'

export interface ContractDocumentData {
  address: string
  chainId: number
  name?: string
  symbol?: string
  tokenType: TokenType
}
