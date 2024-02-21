import type { AccountProviderResult } from '@echo/web3-dom/types/account-provider-result'
import type { AccountResult } from '@echo/web3-dom/types/account-result'

export type AccountProvider = (onChange?: (account: AccountResult) => void) => AccountProviderResult
