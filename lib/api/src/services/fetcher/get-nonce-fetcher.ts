import { assertToken } from '@echo/api/helpers/assert-token'
import { profileNonceApiUrl } from '@echo/api/routing/profile-nonce-api-url'
import { type NonceResponse } from '@echo/api/types/responses/nonce-response'
import { getData } from '@echo/utils/services/get-data'

export function getNonceFetcher(token: string) {
  assertToken(token)
  return getData<undefined, NonceResponse>(profileNonceApiUrl(), undefined, token)
}
