import type { TokenType } from '@echo/model/constants/token-type'
import type { Contract } from '@echo/model/types/contract'

export interface AbstractToken {
  contract: Contract
  name: string
  type: TokenType
}
