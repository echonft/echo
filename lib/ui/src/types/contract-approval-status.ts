import type { Contract } from '@echo/model/types/contract'

export interface ContractApprovalStatus {
  contract: Contract
  approved?: boolean
}
