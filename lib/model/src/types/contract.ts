import type { EvmAddress } from '@echo/model/types/evm-address'
import type { Chain } from '@echo/model/constants/chain'

export interface Contract {
  address: EvmAddress
  chain: Chain
}
