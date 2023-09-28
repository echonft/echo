import { ApiFetcher } from '@echo/api/helpers/api-fetcher'
import { profileWalletApiUrl } from '@echo/api/routing/profile-wallet-api-url'
import { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { EmptyResponse } from '@echo/api/types/responses/empty-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { SiweMessage } from 'siwe'

export function addWalletFetcher(
  address: string,
  message: SiweMessage,
  signature: `0x${string}`,
  token: string | undefined
) {
  if (isNilOrEmpty(token)) {
    throw Error('not logged in')
  }
  return new ApiFetcher(profileWalletApiUrl())
    .method('PUT')
    .bearerToken(token)
    .body<AddWalletRequest>({ wallet: { address, chainId: 1 }, message, signature })
    .fetch<EmptyResponse>()
}
