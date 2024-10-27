import type { EvmAddress } from '@echo/model/types/address'
import type { Contract } from '@echo/model/types/contract'

export interface ContractApproval {
  address: EvmAddress
  contract: Contract
  name: string
  approved?: boolean
}
