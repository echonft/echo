import { ApiMethods } from '@echo/helius/constants/api-methods'
import { getHeliusApiUrl } from '@echo/helius/constants/get-helius-api-url'
import { JSON_RPC_VERSION } from '@echo/helius/constants/json-rpc-version'
import { handleHeliusPaging } from '@echo/helius/helpers/handle-helius-paging'
import type { GetNftsForOwnerRequest } from '@echo/helius/types/request/get-nfts-for-owner-request'
import type { WithPagingParams } from '@echo/helius/types/request/params/with-paging-params'
import type { DigitalAsset } from '@echo/helius/types/response/digital-asset'
import type { HeliusResponseWithPaging } from '@echo/helius/types/response/helius-response-with-paging'
import type { SupportedCluster } from '@echo/helius/types/supported-cluster'
import type { User } from '@echo/model/types/user'
import axios, { type AxiosResponse } from 'axios'
import { prop } from 'ramda'

// TODO Lots of crap from this call, we should clean this somehow
export interface GetNftsForOwnerArgs {
  cluster: SupportedCluster
  owner: User
}
function getNftsForOwnerWithPaging(args: GetNftsForOwnerArgs & WithPagingParams) {
  const { cluster, owner, page, limit } = args
  const {
    wallet: { address }
  } = owner
  return axios
    .post<
      HeliusResponseWithPaging<DigitalAsset>,
      AxiosResponse<HeliusResponseWithPaging<DigitalAsset>>,
      GetNftsForOwnerRequest
    >(
      getHeliusApiUrl(cluster),
      {
        jsonrpc: JSON_RPC_VERSION,
        id: `${ApiMethods.GET_ASSETS_FOR_OWNER}-${address}`,
        method: ApiMethods.GET_ASSETS_FOR_OWNER,
        params: {
          ownerAddress: address,
          page,
          limit
        }
      },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then(prop('data'))
}

export function getNftsForOwner(args: GetNftsForOwnerArgs) {
  return handleHeliusPaging(getNftsForOwnerWithPaging, 'items')(args)
}
