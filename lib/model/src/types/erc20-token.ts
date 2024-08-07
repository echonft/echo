import type { EvmAddress } from '@echo/model/types/evm-address'

export interface ERC20Token {
  contract: EvmAddress
  name: string
  decimals: number
}
