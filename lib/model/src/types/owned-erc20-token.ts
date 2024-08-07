import type { ERC20Token } from '@echo/model/types/erc20-token'

export interface OwnedERC20Token extends ERC20Token {
  balance: number
}
