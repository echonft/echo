import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import { type AddEvmWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import axios from 'axios'
import { prop } from 'ramda'

export function addWallet(args: AddEvmWalletRequest) {
  return axios
    .put<WalletsResponse>(apiUrlProvider.profile.wallet.getUrl(), args, {
      withCredentials: true
    })
    .then(prop('data'))
}
