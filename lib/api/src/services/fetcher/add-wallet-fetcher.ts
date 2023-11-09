import { assertToken } from '@echo/api/helpers/assert-token'
import { profileWalletApiUrl } from '@echo/api/routing/profile-wallet-api-url'
import { type AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { type EmptyResponse } from '@echo/api/types/responses/empty-response'
import { putData } from '@echo/utils/services/put-data'

export function addWalletFetcher(parameters: AddWalletRequest, token: string | undefined) {
  assertToken(token)
  return putData<AddWalletRequest, EmptyResponse>(profileWalletApiUrl(), parameters, token)
}
