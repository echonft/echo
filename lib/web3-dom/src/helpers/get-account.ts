import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { mapGetAccountReturnToAccountResult } from '@echo/web3-dom/mappers/map-get-account-return-to-account-result'
import type { AccountProviderResult } from '@echo/web3-dom/types/account-provider-result'
import type { AccountResult } from '@echo/web3-dom/types/account-result'
import { isNil, pipe } from 'ramda'
import { getAccount as WagmiGetAccount, type GetAccountReturnType, watchAccount } from 'wagmi/actions'

export function getAccount(onChange?: (account: AccountResult) => void): AccountProviderResult {
  const account = pipe(WagmiGetAccount, mapGetAccountReturnToAccountResult)(wagmiConfig)
  if (isNil(onChange)) {
    return {
      account,
      unsubscribe: () => {
        // nothing to do
      }
    }
  }
  const unsubscribe = watchAccount(wagmiConfig, {
    onChange: (account: GetAccountReturnType, _prevAccount: GetAccountReturnType) => {
      pipe(mapGetAccountReturnToAccountResult, onChange)(account)
    }
  })
  onChange(account)
  return { account, unsubscribe }
}
