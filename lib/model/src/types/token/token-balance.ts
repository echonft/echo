import type { Erc1155Token } from '@echo/model/types/token/erc1155-token'
import type { Erc20Token } from '@echo/model/types/token/erc20-token'

export interface TokenBalance<T extends Erc20Token | Erc1155Token> {
  token: T
  balance: number
}
