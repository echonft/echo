import { ApiRoutes, getApiRouteUrl } from '@echo/api/dist/public'
import { WalletRequest, WalletResponse } from '@echo/api/dist/types'
import { Wallet } from '@echo/model'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { castAs, deleteData, isNilOrEmpty } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { always, converge, path, pipe } from 'ramda'
import useSWR from 'swr'

interface KeyData {
  url: string
  request: WalletRequest | undefined
}
export const useRemoveWallets = (wallets: Wallet[] | undefined) =>
  useSWR<R.Result<WalletResponse, Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      {
        name: SwrKeyNames.API_REMOVE_WALLETS,
        data: {
          url: getApiRouteUrl(ApiRoutes.WALLET),
          request: {
            wallet: wallets!
          }
        }
      },
      always(isNilOrEmpty(wallets))
    ),
    converge(
      (url: string, data: WalletRequest) => deleteData<WalletResponse, WalletRequest>(url, data),
      [pipe(path(['data', 'url']), castAs<string>), pipe(path(['data', 'request']), castAs<WalletRequest>)]
    )
  )
