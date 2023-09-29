import { getAxiosConfig } from '@echo/api/helpers/get-axios-config'
import { profileWalletApiUrl } from '@echo/api/routing/profile-wallet-api-url'
import { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { EmptyResponse } from '@echo/api/types/responses/empty-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import axios from 'axios'
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
  return axios.put<AddWalletRequest, EmptyResponse>(
    profileWalletApiUrl().toString(),
    {
      wallet: { address, chainId: 1 },
      message,
      signature
    },
    getAxiosConfig(token)
  )
}
