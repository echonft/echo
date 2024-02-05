import { accountStatusStore } from '@echo/storybook/mocks/stores/account-status-store'

export function disconnectWallet() {
  accountStatusStore.getState().disconnect()
  return Promise.resolve()
}
