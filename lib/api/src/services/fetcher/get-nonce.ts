import { assertToken } from '@echo/api/helpers/assert-token'
import { getAuthorizationHeader } from '@echo/api/helpers/get-authorization-header'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { type NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { TokenArgs } from '@echo/api/types/token-args'
import axios from 'axios'
import { prop } from 'ramda'

export function getNonce(args: TokenArgs) {
  assertToken(args)
  return axios
    .get<NonceResponse>(apiUrlProvider.profile.nonce.get(), {
      headers: getAuthorizationHeader(args)
    })
    .then(prop('data'))
}
