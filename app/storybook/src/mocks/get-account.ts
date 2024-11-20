import { userMockCrew } from '@echo/model/mocks/user-mock'
import { accountStatusStore } from '@echo/storybook/mocks/stores/account-status-store'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import type { AccountResult } from '@echo/web3-dom/services/get-account'

function getResultFromStatus(status: AccountStatus): AccountResult {
  if (status === AccountStatus.Connected) {
    return { address: userMockCrew.wallet, status }
  }
  return { address: undefined, status }
}

export function getAccount(): AccountResult {
  return getResultFromStatus(accountStatusStore.getState().status)
}

export function watchAccount(_onChange: (account: AccountResult, prevAccount: AccountResult) => void): VoidFunction {
  // const unsubscribe = accountStatusStore.subscribe((state) => {
  //   const result = getResultFromStatus(state.status)
  //   onChange(result, result)
  // })
  // const status = accountStatusStore.getState().status
  // const result = getResultFromStatus(status)
  // onChange(result, result)
  // return () => {
  //   accountStatusStore.getState().disconnect()
  //   unsubscribe()
  // }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return () => {}
}
