import { getWalletMock } from '@echo/model-mocks/wallet/get-wallet-mock'
import { accountStatusStore } from '@echo/storybook/mocks/stores/account-status-store'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import type { AccountProviderResult } from '@echo/web3/types/account-provider-result'
import type { AccountResult } from '@echo/web3/types/account-result'
import type { AccountStatus } from '@echo/web3/types/account-status'
import { isNil } from 'ramda'

export function getAccount(onChange?: (account: AccountResult) => void): AccountProviderResult {
  function getResultFromStatus(status: AccountStatus): AccountResult {
    if (status === 'connected') {
      const { chainId, address } = getWalletMock()
      const chain = getChainById(chainId)
      return { chain, chainId, address, status }
    }
    return { chain: undefined, chainId: undefined, address: undefined, status }
  }
  const status = accountStatusStore.getState().status
  const account = getResultFromStatus(status)
  if (!isNil(onChange)) {
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
  return {
    account
  }
}
