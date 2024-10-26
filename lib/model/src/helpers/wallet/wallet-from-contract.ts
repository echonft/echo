import { chainVirtualMachine } from '@echo/model/helpers/chain/chain-virtual-machine'
import type { Contract } from '@echo/model/types/contract'
import type { Wallet } from '@echo/model/types/wallet'

export function walletFromContract(contract: Contract): Wallet {
  return { address: contract.address, vm: chainVirtualMachine(contract.chain) }
}
