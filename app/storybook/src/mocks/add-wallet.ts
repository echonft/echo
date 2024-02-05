import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import { getWalletMock } from '@echo/model-mocks/wallet/get-wallet-mock'
import { errorStore } from '@echo/storybook/mocks/stores/error-store'
import { delayPromise } from '@echo/utils/helpers/delay-promise'

export function addWallet(_args: AddWalletRequest): Promise<WalletsResponse> {
  const error = errorStore.getState().addWalletError
  if (error) {
    return delayPromise(Promise.reject(), 800)
  }
  return delayPromise(
    Promise.resolve({
      wallets: [getWalletMock()]
    }),
    800
  )
}
