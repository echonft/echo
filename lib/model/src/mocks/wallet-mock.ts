import { VirtualMachine } from '@echo/model/constants/virtual-machine'
import type { Wallet } from '@echo/model/types/wallet'

export const walletMockCrew: Wallet = {
  address: '0xf672715f2ba85794659a7150e8c21f8d157bfe1d',
  vm: VirtualMachine.Evm
}

export const walletMockJohnny: Wallet = {
  address: '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e',
  vm: VirtualMachine.Evm
}
