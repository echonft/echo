import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import { authUserStore } from '@echo/storybook/mocks/stores/auth-user-store'
import { delayPromise } from '@echo/utils/helpers/delay-promise'

export function getWallets(): Promise<WalletsResponse> {
  return delayPromise(
    Promise.resolve({
      wallets: authUserStore.getState().wallets
    }),
    800
  )
}
