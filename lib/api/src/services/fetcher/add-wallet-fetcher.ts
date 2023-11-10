import { assertToken } from '@echo/api/helpers/assert-token'
import { apiUrl } from '@echo/api/routing/api-url'
import { type AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { type EmptyResponse } from '@echo/api/types/responses/empty-response'
import axios from 'axios'
import { prop } from 'ramda'

export function addWalletFetcher(data: AddWalletRequest, token: string | undefined) {
  assertToken(token)
  return axios
    .put<EmptyResponse>(apiUrl.profile.wallet, {
      data,
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(prop('data'))
}
