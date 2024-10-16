import { type NonceResponse } from '@echo/api/types/responses/nonce-response'
import { apiPathProvider } from '@echo/routing/api-path-provider'
import axios from 'axios'
import { prop } from 'ramda'

export function getNonce() {
  return axios
    .get<NonceResponse>(apiPathProvider.profile.nonce.getUrl(), {
      withCredentials: true
    })
    .then(prop('data'))
}
