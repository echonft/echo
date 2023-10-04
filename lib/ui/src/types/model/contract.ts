import { TokenType } from '@echo/ui/types/model/token-type'

export interface Contract {
  address: string
  chainId: number
  name?: string
  symbol?: string
  tokenType: TokenType
}
