import type { Address } from '@echo/model/types/address'

export interface ContractApproval {
  contract: Address
  name: string
  wallet: Address
  approved?: boolean
}
