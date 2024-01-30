import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import { type AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import axios from 'axios'
import { prop } from 'ramda'

export function addWallet(args: AddWalletRequest) {
  return axios
    .put<WalletsResponse>(apiUrlProvider.profile.wallet.getUrl(), args, {
      withCredentials: true
    })
    .then(prop('data'))
}
