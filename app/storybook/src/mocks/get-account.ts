import { userMockCrew } from '@echo/model/mocks/user-mock'
import { authStore } from '@echo/storybook/mocks/stores/auth-store'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import type { AccountResult } from '@echo/web3-dom/services/get-account'

export function getAccount(): AccountResult {
  const { status } = authStore.getState()
  if (status === AccountStatus.Connected) {
    return { address: userMockCrew.wallet, status }
  }
  return { address: undefined, status }
}

export function watchAccount(_onChange: (account: AccountResult, prevAccount: AccountResult) => void): VoidFunction {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return () => {}
}
