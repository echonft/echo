import { ApiMethods } from '@echo/helius/constants/api-methods'
import { getHeliusApiUrl } from '@echo/helius/constants/get-helius-api-url'
import { JSON_RPC_VERSION } from '@echo/helius/constants/json-rpc-version'
import type { GetNftsForCollectionRequest } from '@echo/helius/types/request/get-nfts-for-collection-request'
import type { GetNftsForCollectionResponse } from '@echo/helius/types/response/get-nfts-for-collection-response'
import type { SupportedCluster } from '@echo/helius/types/supported-cluster'
import axios, { type AxiosResponse } from 'axios'
import { pipe, prop } from 'ramda'

export interface GetSolanaNftsForCollectionArgs {
  cluster: SupportedCluster
  collectionAddress: string
}
export function getNftsForCollection(args: GetSolanaNftsForCollectionArgs): Promise<GetNftsForCollectionResponse> {
  const { cluster, collectionAddress } = args
  return axios
    .post<GetNftsForCollectionResponse, AxiosResponse<GetNftsForCollectionResponse>, GetNftsForCollectionRequest>(
      getHeliusApiUrl(cluster),
      {
        jsonrpc: JSON_RPC_VERSION,
        id: `${ApiMethods.GET_ASSETS_BY_GROUP}-${collectionAddress}`,
        method: ApiMethods.GET_ASSETS_BY_GROUP,
        params: {
          groupKey: 'collection',
          groupValue: collectionAddress,
          page: 1,
          limit: 2,
          displayOptions: {
            showCollectionMetadata: true
          }
        }
      },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then(pipe(prop('data')))
}
