import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import { walletMockCrew } from '@echo/model/mocks/wallet-mock'
import { errorStore } from '@echo/storybook/mocks/stores/error-store'
import { toPromise } from '@echo/utils/helpers/to-promise'
import { toRejectedPromise } from '@echo/utils/helpers/to-rejected-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { identity, juxt, objOf, pipe } from 'ramda'

export function addWallet(): Promise<WalletsResponse> {
  const error = errorStore.getState().addWalletError
  if (error) {
    return pipe(toRejectedPromise, delayPromise(800))()
  }
  return pipe(juxt([identity]), objOf('wallets'), toPromise, delayPromise(800))(walletMockCrew)
}
