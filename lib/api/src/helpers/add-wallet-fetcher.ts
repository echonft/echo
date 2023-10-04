import { putData } from '@echo/api/helpers/api-fetcher'
import { profileWalletApiUrl } from '@echo/api/routing/profile-wallet-api-url'
import { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { EmptyResponse } from '@echo/api/types/responses/empty-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { Signature } from '@echo/utils/types/signature'

export function addWalletFetcher(
  address: string,
  chainId: number,
  message: string,
  signature: Signature,
  token: string | undefined
) {
  if (isNilOrEmpty(token)) {
    throw Error('not logged in')
  }
  return putData<AddWalletRequest, EmptyResponse>(
    profileWalletApiUrl(),
    {
      wallet: { address, chainId },
      message,
      signature
    },
    token
  )
}
