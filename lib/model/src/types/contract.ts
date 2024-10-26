import type { Chain } from '@echo/model/constants/chain'
import type { Address } from '@echo/model/types/address'

export interface Contract {
  address: Address
  chain: Chain
}
