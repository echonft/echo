import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import { walletMockCrew } from '@echo/model/mocks/wallet-mock'
import { toPromise } from '@echo/utils/helpers/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { identity, juxt, objOf, pipe } from 'ramda'

export function getWallets(): Promise<WalletsResponse> {
  return pipe(juxt([identity]), objOf('wallets'), toPromise, delayPromise(800))(walletMockCrew)
}
