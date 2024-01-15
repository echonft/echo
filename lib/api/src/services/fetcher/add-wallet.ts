import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { type AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { type EmptyResponse } from '@echo/api/types/responses/empty-response'
import axios from 'axios'
import { prop } from 'ramda'

export function addWallet(args: AddWalletRequest) {
  return axios
    .put<EmptyResponse>(apiUrlProvider.profile.wallet.getUrl(), args, {
      withCredentials: true
    })
    .then(prop('data'))
}
