import type { Contract } from '@echo/model/types/contract'
import type { Wallet } from '@echo/model/types/wallet'

export interface ContractApproval {
  name: string
  contract: Contract
  wallet: Wallet
  approved?: boolean
}
