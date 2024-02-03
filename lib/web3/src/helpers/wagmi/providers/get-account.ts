import { wagmiConfig } from '@echo/web3/helpers/wagmi/wagmi-config'
import { mapGetAccountReturnToAccountResult } from '@echo/web3/mappers/map-get-account-return-to-account-result'
import type { AccountProviderResult } from '@echo/web3/types/account-provider-result'
import type { AccountResult } from '@echo/web3/types/account-result'
import { isNil, pipe } from 'ramda'
import { getAccount as WagmiGetAccount, type GetAccountReturnType, watchAccount } from 'wagmi/actions'

export function getAccount(onChange?: (account: AccountResult) => void): AccountProviderResult {
  const account = pipe(WagmiGetAccount, mapGetAccountReturnToAccountResult)(wagmiConfig)
  if (isNil(onChange)) {
    return { account }
  }
  const unsubscribe = watchAccount(wagmiConfig, {
    onChange: (account: GetAccountReturnType, _prevAccount: GetAccountReturnType) => {
      return pipe(mapGetAccountReturnToAccountResult, onChange)(account)
    }
  })
  onChange(account)
  return { account, unsubscribe }
}
