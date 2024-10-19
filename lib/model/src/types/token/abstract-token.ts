import type { TokenType } from '@echo/model/constants/token-type'
import type { Wallet } from '@echo/model/types/wallet'

export interface AbstractToken {
  contract: Wallet
  name: string
  type: TokenType
}
