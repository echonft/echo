import { ApiRoutes } from '@echo/api/dist/routes/constants/api-routes'
import { WalletRequest } from '@echo/api/dist/types/models/requests/wallet-request'
import { WalletResponse } from '@echo/api/dist/types/models/responses/wallet-response'
import { Signature, Wallet } from '@echo/model'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { castAs, isNilOrEmpty } from '@echo/utils'
import { putData } from '@echo/utils/dist/services/fetcher/put-data'
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
          // FIXME The `getApiUrl` function from `@echo/api` leads to an error
          url: `http://localhost:3000/${ApiRoutes.WALLET}`,
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
