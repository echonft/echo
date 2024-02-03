import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import axios from 'axios'
import { prop } from 'ramda'

export function getWallets(): Promise<WalletsResponse> {
  return axios
    .get<WalletsResponse>(apiUrlProvider.profile.wallets.getUrl(), {
      withCredentials: true
    })
    .then(prop('data'))
}
