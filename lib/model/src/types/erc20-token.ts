import type { EvmAddress } from '@echo/model/types/evm-address'

export interface Erc20Token {
  contract: EvmAddress
  name: string
  decimals: number
}
