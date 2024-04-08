import { ApiMethods } from '@echo/helius/constants/api-methods'
import { getHeliusApiUrl } from '@echo/helius/constants/get-helius-api-url'
import { JSON_RPC_VERSION } from '@echo/helius/constants/json-rpc-version'
import { handleHeliusPaging } from '@echo/helius/helpers/handle-helius-paging'
import type { GetNftsForCollectionRequest } from '@echo/helius/types/request/get-nfts-for-collection-request'
import type { WithPagingParams } from '@echo/helius/types/request/params/with-paging-params'
import type { DigitalAsset } from '@echo/helius/types/response/digital-asset'
import type { HeliusResponseWithPaging } from '@echo/helius/types/response/helius-response-with-paging'
import type { SupportedCluster } from '@echo/helius/types/supported-cluster'
import axios, { type AxiosResponse } from 'axios'
import { prop } from 'ramda'

export interface GetNftsForCollectionArgs {
  cluster: SupportedCluster
  collectionAddress: string
}
function getNftsForCollectionWithPaging(
  args: GetNftsForCollectionArgs & WithPagingParams
): Promise<HeliusResponseWithPaging<DigitalAsset>> {
  const { cluster, collectionAddress, page, limit } = args
  return axios
    .post<
      HeliusResponseWithPaging<DigitalAsset>,
      AxiosResponse<HeliusResponseWithPaging<DigitalAsset>>,
      GetNftsForCollectionRequest
    >(
      getHeliusApiUrl(cluster),
      {
        jsonrpc: JSON_RPC_VERSION,
        id: `${ApiMethods.GET_ASSETS_BY_GROUP}-${collectionAddress}`,
        method: ApiMethods.GET_ASSETS_BY_GROUP,
        params: {
          groupKey: 'collection',
          groupValue: collectionAddress,
          page,
          limit,
          displayOptions: {
            showCollectionMetadata: true
          }
        }
      },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then(prop('data'))
}

export function getNftsForCollection(args: GetNftsForCollectionArgs): Promise<DigitalAsset[]> {
  return handleHeliusPaging(getNftsForCollectionWithPaging, 'items')(args)
}
