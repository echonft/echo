import { assertToken } from '@echo/api/helpers/assert-token'
import { getAuthorizationHeader } from '@echo/api/helpers/get-authorization-header'
import { apiUrl } from '@echo/api/routing/api-url'
import { type NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { TokenArgs } from '@echo/api/types/token-args'
import axios from 'axios'
import { prop } from 'ramda'

export function getNonce(args: TokenArgs) {
  assertToken(args)
  return axios
    .get<NonceResponse>(apiUrl.profile.nonce, {
      headers: getAuthorizationHeader(args)
    })
    .then(prop('data'))
}
