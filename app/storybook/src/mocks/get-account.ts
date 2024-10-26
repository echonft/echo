import { walletMockCrew } from '@echo/model/mocks/wallet-mock'
import { accountStatusStore } from '@echo/storybook/mocks/stores/account-status-store'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import type { AccountProviderResult, AccountResult } from '@echo/web3-dom/services/get-account'
import { isNil } from 'ramda'

export function getAccount(onChange?: (account: AccountResult) => void): AccountProviderResult {
  function getResultFromStatus(status: AccountStatus): AccountResult {
    if (status === AccountStatus.Connected) {
      return { wallet: walletMockCrew, status }
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
