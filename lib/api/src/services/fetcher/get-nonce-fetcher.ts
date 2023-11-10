import { assertToken } from '@echo/api/helpers/assert-token'
import { apiUrl } from '@echo/api/routing/api-url'
import { type NonceResponse } from '@echo/api/types/responses/nonce-response'
import axios from 'axios'
import { prop } from 'ramda'

export function getNonceFetcher(token: string) {
  assertToken(token)
  return axios
    .get<NonceResponse>(apiUrl.profile.nonce, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(prop('data'))
}
