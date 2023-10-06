import { assertToken } from '@echo/api/helpers/assert-token'
import { profileWalletApiUrl } from '@echo/api/routing/profile-wallet-api-url'
import { putData } from '@echo/api/services/fetcher/base/put-data'
import { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { EmptyResponse } from '@echo/api/types/responses/empty-response'

export function addWalletFetcher(parameters: AddWalletRequest, token: string | undefined) {
  assertToken(token)
  return putData<AddWalletRequest, EmptyResponse>(profileWalletApiUrl(), parameters, token)
}
