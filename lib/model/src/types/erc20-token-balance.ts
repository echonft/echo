import type { Erc20Token } from '@echo/model/types/erc20-token'

export interface Erc20TokenBalance {
  token: Erc20Token
  balance: number
}
