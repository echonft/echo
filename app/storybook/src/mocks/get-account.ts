import { getWalletMock } from '@echo/model/mocks/wallet/wallet-mock'
import { accountStatusStore } from '@echo/storybook/mocks/stores/account-status-store'
import type { AccountProviderResult } from '@echo/web3-dom/types/account-provider-result'
import type { AccountResult } from '@echo/web3-dom/types/account-result'
import type { AccountStatus } from '@echo/web3-dom/types/account-status'
import { isNil } from 'ramda'

export function getAccount(onChange?: (account: AccountResult) => void): AccountProviderResult {
  function getResultFromStatus(status: AccountStatus): AccountResult {
    if (status === 'connected') {
      return { wallet: getWalletMock(), status }
    }
    return { wallet: undefined, status }
  }

  const status = accountStatusStore.getState().status
  const account = getResultFromStatus(status)
  if (isNil(onChange)) {
    return {
      account,
      unsubscribe: () => {
        // nothing to do
      }
    }
  }
  const unsubscribe = accountStatusStore.subscribe((state) => {
    onChange(getResultFromStatus(state.status))
  })
  onChange(account)
  return {
    account,
    unsubscribe: () => {
      accountStatusStore.getState().disconnect()
      unsubscribe()
    }
  }
}
