import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import { apiPathProvider } from '@echo/routing/path/api-path-provider'
import axios from 'axios'
import { prop } from 'ramda'

export function getWallets(): Promise<WalletsResponse> {
  return axios
    .get<WalletsResponse>(apiPathProvider.profile.wallets.getUrl(), {
      withCredentials: true
    })
    .then(prop('data'))
}
