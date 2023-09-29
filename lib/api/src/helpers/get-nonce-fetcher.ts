import { getAxiosConfig } from '@echo/api/helpers/get-axios-config'
import { profileNonceApiUrl } from '@echo/api/routing/profile-nonce-api-url'
import { NonceResponse } from '@echo/api/types/responses/nonce-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import axios from 'axios'

export function getNonceFetcher(token: string | undefined) {
  if (isNilOrEmpty(token)) {
    throw Error('not logged in')
  }
  return axios.get<NonceResponse>(profileNonceApiUrl().toString(), getAxiosConfig(token))
}
