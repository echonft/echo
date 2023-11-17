import { assertToken } from '@echo/api/helpers/assert-token'
import { getAuthorizationHeader } from '@echo/api/helpers/get-authorization-header'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import { type AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import { type EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { TokenArgs } from '@echo/api/types/token-args'
import axios from 'axios'
import { omit, prop } from 'ramda'

export interface AddWalletArgs extends AddWalletRequest, TokenArgs {}
export function addWallet(args: AddWalletArgs) {
  assertToken(args)
  return axios
    .put<EmptyResponse>(apiUrlProvider.profile.wallet.getUrl(), {
      data: omit(['token'], args),
      headers: getAuthorizationHeader(args)
    })
    .then(prop('data'))
}
