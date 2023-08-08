import { ApiRoutes, getApiRouteUrl, WalletRequest, WalletResponse } from '@echo/api-public'
import { Signature, Wallet } from '@echo/model'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { isNilOrEmpty, putData } from '@echo/utils'
import { always, converge, path } from 'ramda'
import { SiweMessage } from 'siwe'
import useSWR from 'swr'

interface KeyData {
  url: string
  request: WalletRequest | undefined
}
export const useAddWallet = (message: SiweMessage, signature: Signature, wallet: Wallet | undefined) =>
  useSWR<WalletResponse, Error, SwrKey<KeyData> | undefined>(
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    converge(putData, [path(['data', 'url']), path(['data', 'request'])])
  )
