import { ApiRoutes } from '@echo/api/dist/config/api-routes'
import { getApiRouteUrl } from '@echo/api/dist/config/get-api-route-url'
import { WalletRequest, WalletResponse } from '@echo/api/dist/types'
import { Signature, Wallet } from '@echo/model'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { castAs, isNilOrEmpty, putData } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { always, converge, path, pipe } from 'ramda'
import { SiweMessage } from 'siwe'
import useSWRImmutable from 'swr/immutable'

interface KeyData {
  url: string
  request: WalletRequest | undefined
}
// TODO Should not be immutable
// Should we use
export const useAddWallet = (message: SiweMessage, signature: Signature, wallet: Wallet | undefined) =>
  useSWRImmutable<R.Result<WalletResponse, Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      {
        name: SwrKeyNames.API_ADD_WALLET,
        data: {
          url: getApiRouteUrl(ApiRoutes.WALLET),
          request: {
            wallet,
            message,
            signature
          }
        }
      },
      always(isNilOrEmpty(wallet))
    ),
    converge(
      (url: string, data: WalletRequest) => putData<WalletResponse, WalletRequest>(url, data),
      [pipe(path(['data', 'url']), castAs<string>), pipe(path(['data', 'request']), castAs<WalletRequest>)]
    )
  )
