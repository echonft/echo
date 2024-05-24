import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import { getWalletMock } from '@echo/model-mocks/wallet/wallet-mock'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { applySpec, juxt, pipe } from 'ramda'

export function getWallets(): Promise<WalletsResponse> {
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
