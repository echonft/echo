import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import { authUserStore } from '@echo/storybook/mocks/stores/auth-user-store'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { applySpec, pipe, prop } from 'ramda'

export function getWallets(): Promise<WalletsResponse> {
  return delayPromise(
    pipe(
      applySpec<WalletsResponse>({
        wallets: prop('wallets')
      }),
      toPromise
    ),
    800
  )(authUserStore.getState())
}
