import { ApiRoutes, getApiRouteUrl, WalletRequest, WalletResponse } from '@echo/api-public'
import { Signature, Wallet } from '@echo/model'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { castAs, isNilOrEmpty, putData } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { always, converge, path, pipe } from 'ramda'
import { SiweMessage } from 'siwe'
import useSWR from 'swr'

interface KeyData {
  url: string
  request: WalletRequest | undefined
}
export const useAddWallet = (message: SiweMessage, signature: Signature, wallet: Wallet | undefined) =>
  useSWR<R.Result<WalletResponse, Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      {
        name: SwrKeyNames.API_ADD_WALLET,
        data: {
          url: getApiRouteUrl(ApiRoutes.WALLET),
          request: {
            wallet: wallet!,
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
