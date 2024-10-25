import { VirtualMachine } from '@echo/model/constants/virtual-machine'
import type { EvmAddress } from '@echo/model/types/evm-address'

export interface Wallet {
  address: EvmAddress
  vm: VirtualMachine
}
