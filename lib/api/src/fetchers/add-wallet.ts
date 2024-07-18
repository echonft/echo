import { apiPathProvider } from '@echo/api/routing/api/api-path-provider'
import { type AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import axios from 'axios'
import { prop } from 'ramda'

export function addWallet(args: AddWalletRequest) {
  return axios
    .put<WalletsResponse>(apiPathProvider.profile.wallet.getUrl(), args, {
      withCredentials: true
    })
    .then(prop('data'))
}
