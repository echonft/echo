import { VirtualMachine } from '@echo/model/constants/virtual-machine'
import type { Address } from '@echo/model/types/address'

export interface Wallet {
  address: Address
  vm: VirtualMachine
}
