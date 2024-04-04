import { ApiMethods } from '@echo/helius/constants/api-methods'
import { getHeliusApiUrl } from '@echo/helius/constants/get-helius-api-url'
import { JSON_RPC_VERSION } from '@echo/helius/constants/json-rpc-version'
import { mapGetNftsForOwnerResponse } from '@echo/helius/mappers/map-get-nfts-for-owner-response'
import type { GetNftsForOwnerRequest } from '@echo/helius/types/request/get-nfts-for-owner-request'
import type { GetNftsForOwnerResponse } from '@echo/helius/types/response/get-nfts-for-owner-response'
import type { SupportedCluster } from '@echo/helius/types/supported-cluster'
import type { User } from '@echo/model/types/user'
import axios, { type AxiosResponse } from 'axios'
import { pipe, prop } from 'ramda'

// TODO Lots of crap from this call, we should clean this somehow
export interface GetSolanaNftsForOwnerArgs {
  cluster: SupportedCluster
  owner: User
}
export function getNftsForOwner(args: GetSolanaNftsForOwnerArgs) {
  const { cluster, owner } = args
  const {
    wallet: { address }
  } = owner
  return axios
    .post<GetNftsForOwnerResponse, AxiosResponse<GetNftsForOwnerResponse>, GetNftsForOwnerRequest>(
      getHeliusApiUrl(cluster),
      {
        jsonrpc: JSON_RPC_VERSION,
        id: `${ApiMethods.GET_ASSETS_FOR_OWNER}-${address}`,
        method: ApiMethods.GET_ASSETS_FOR_OWNER,
        params: {
          ownerAddress: address,
          page: 1,
          limit: 1000
        }
      },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then(pipe(prop('data'), mapGetNftsForOwnerResponse(owner)))
}
