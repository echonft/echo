import type { EvmAddress } from '@echo/model/types/evm-address'
import type { ChainName } from '@echo/utils/types/chain-name'

export interface Wallet {
  address: EvmAddress
  chain: ChainName
}
