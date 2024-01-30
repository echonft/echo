import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import { type NonceResponse } from '@echo/api/types/responses/nonce-response'
import axios from 'axios'
import { prop } from 'ramda'

export function getNonce() {
  return axios
    .get<NonceResponse>(apiUrlProvider.profile.nonce.getUrl(), {
      withCredentials: true
    })
    .then(prop('data'))
}
