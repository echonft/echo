import type { AccountResult } from '@echo/web3-dom/types/account-result'

export interface AccountProviderResult {
  account: AccountResult
  unsubscribe: () => void
}
