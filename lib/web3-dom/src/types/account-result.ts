import type { Wallet } from '@echo/model/types/wallet'
import type { Nullable } from '@echo/utils/types/nullable'
import type { AccountStatus } from '@echo/web3-dom/types/account-status'

export interface AccountResult {
  wallet: Nullable<Wallet>
  status: AccountStatus
}
