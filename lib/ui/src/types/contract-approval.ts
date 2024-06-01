import type { Wallet } from '@echo/model/types/wallet'

export interface ContractApproval {
  name: string
  contract: Wallet
  wallet: Wallet
  approved?: boolean
}
