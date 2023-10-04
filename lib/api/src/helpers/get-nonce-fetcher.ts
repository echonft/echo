import { getData } from '@echo/api/helpers/api-fetcher'
import { profileNonceApiUrl } from '@echo/api/routing/profile-nonce-api-url'
import { NonceResponse } from '@echo/api/types/responses/nonce-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function getNonceFetcher(token: string | undefined) {
  if (isNilOrEmpty(token)) {
    throw Error('not logged in')
  }
  return getData<NonceResponse>(profileNonceApiUrl(), token)
}
