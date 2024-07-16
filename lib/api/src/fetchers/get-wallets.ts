import { apiPathProvider } from '@echo/api/routing/api/api-path-provider'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import axios from 'axios'
import { prop } from 'ramda'

export function getWallets(): Promise<WalletsResponse> {
  return axios
    .get<WalletsResponse>(apiPathProvider.profile.wallets.getUrl(), {
      withCredentials: true
    })
    .then(prop('data'))
}
