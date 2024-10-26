import type { EvmAddress } from '@echo/model/types/address'
import type { Contract } from '@echo/model/types/contract'

export interface ContractApproval {
  name: string
  contract: Contract
  wallet: EvmAddress
  approved?: boolean
}
