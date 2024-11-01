import { Chain } from '@echo/model/constants/chain'
import { walletMockCrew } from '@echo/model/mocks/wallet-mock'
import { accountStatusStore } from '@echo/storybook/mocks/stores/account-status-store'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import type { AccountResult } from '@echo/web3-dom/services/get-account'

function getResultFromStatus(status: AccountStatus): AccountResult {
  if (status === AccountStatus.Connected) {
    return { address: walletMockCrew.address, chain: Chain.Ethereum, status }
  }
  return { address: undefined, chain: undefined, status }
}

export function getAccount(): AccountResult {
  return getResultFromStatus(accountStatusStore.getState().status)
}

export function watchAccount(onChange: (account: AccountResult, prevAccount: AccountResult) => void): VoidFunction {
  const unsubscribe = accountStatusStore.subscribe((state) => {
    const result = getResultFromStatus(state.status)
    onChange(result, result)
  })
  const status = accountStatusStore.getState().status
  const result = getResultFromStatus(status)
  onChange(result, result)
  return () => {
    accountStatusStore.getState().disconnect()
    unsubscribe()
  }
}
