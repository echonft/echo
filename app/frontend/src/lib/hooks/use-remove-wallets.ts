import { ApiRoutes } from '@echo/api/dist/routes/constants/api-routes'
import { WalletRequest } from '@echo/api/dist/types/models/requests/wallet-request'
import { WalletResponse } from '@echo/api/dist/types/models/responses/wallet-response'
import { Wallet } from '@echo/model'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { castAs, isNilOrEmpty } from '@echo/utils'
import { deleteData } from '@echo/utils/dist/services/fetcher/delete-data'
import { R } from '@mobily/ts-belt'
import { always, converge, path, pipe } from 'ramda'
import useSWR from 'swr'

interface KeyData {
  url: string
  request: WalletRequest | undefined
}
// TODO Should not be immutable
// Should we use
export const useRemoveWallets = (wallets: Wallet[] | undefined) =>
  useSWR<R.Result<WalletResponse, Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      {
        name: SwrKeyNames.API_REMOVE_WALLETS,
        data: {
          // FIXME The `getApiUrl` function from `@echo/api` leads to an error
          url: `http://localhost:3000/${ApiRoutes.WALLET}`,
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
