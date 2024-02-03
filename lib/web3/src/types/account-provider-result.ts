import type { AccountResult } from '@echo/web3/types/account-result'

export interface AccountProviderResult {
  account: AccountResult
  unsubscribe?: () => void
}
