import type { AccountProviderResult } from '@echo/web3/types/account-provider-result'
import type { AccountResult } from '@echo/web3/types/account-result'

export type AccountProvider = (onChange?: (account: AccountResult) => void) => AccountProviderResult
