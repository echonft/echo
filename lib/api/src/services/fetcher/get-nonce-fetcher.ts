import { assertToken } from '@echo/api/helpers/assert-token'
import { profileNonceApiUrl } from '@echo/api/routing/profile-nonce-api-url'
import { getData } from '@echo/api/services/fetcher/base/get-data'
import { type NonceResponse } from '@echo/api/types/responses/nonce-response'

export function getNonceFetcher(token: string) {
  assertToken(token)
  return getData<NonceResponse>(profileNonceApiUrl(), token)
}
