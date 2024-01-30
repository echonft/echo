import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { Wallet } from '@echo/model/types/wallet'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { pipe, prop } from 'ramda'

export function addWallet(_args: AddWalletRequest): Promise<WalletsResponse> {
  return delayPromise(
    Promise.resolve({
      wallets: pipe<[string], AuthUser, Wallet[]>(
        getAuthUserMockByUsername,
        nonNullableReturn(prop('wallets'))
      )('johnnycagewins')
    }),
    1200
  )
}
