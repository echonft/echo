import type { EvmAddress } from '@echo/model/types/evm-address'
import type { Chain } from '@echo/utils/constants/chain'

export interface Wallet {
  address: EvmAddress
  chain: Chain
}
