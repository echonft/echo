import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import { getWalletMock } from '@echo/model-mocks/wallet/wallet-mock'
import { errorStore } from '@echo/storybook/mocks/stores/error-store'
import { toPromise } from '@echo/utils/fp/to-promise'
import { toRejectedPromise } from '@echo/utils/fp/to-rejected-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { applySpec, juxt, pipe } from 'ramda'

export function addWallet(_args: AddWalletRequest): Promise<WalletsResponse> {
  const error = errorStore.getState().addWalletError
  if (error) {
    return delayPromise(toRejectedPromise, 800)()
  }
  return delayPromise(
    pipe(
      applySpec<WalletsResponse>({
        wallets: juxt([getWalletMock])
      }),
      toPromise
    ),
    800
  )()
}
