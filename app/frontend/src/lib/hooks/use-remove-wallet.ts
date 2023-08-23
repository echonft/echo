import { EmptyResponse, getUserWalletUrl, WalletRequest } from '@echo/api-public'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { Wallet } from '@echo/ui-model'
import { deleteData, isNilOrEmpty } from '@echo/utils'
import { always, converge, path } from 'ramda'
import useSWR, { SWRResponse } from 'swr'

interface KeyData {
  url: URL
  request: WalletRequest | undefined
}
export const useRemoveWallet = (wallet: Wallet | undefined): SWRResponse<EmptyResponse, Error> =>
  useSWR<EmptyResponse, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      {
        name: SwrKeyNames.API_REMOVE_WALLETS,
        data: {
          url: getUserWalletUrl(),
          request: {
            wallet: wallet!
          }
        }
      },
      always(isNilOrEmpty(wallet))
    ),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    converge(deleteData, [path(['data', 'url']), path(['data', 'request'])])
  )
