import { ApiMethods } from '@echo/helius/constants/api-methods'
import { getHeliusApiUrl } from '@echo/helius/constants/get-helius-api-url'
import { JSON_RPC_VERSION } from '@echo/helius/constants/json-rpc-version'
import type { GetNftRequest } from '@echo/helius/types/request/get-nft-request'
import type { DigitalAsset } from '@echo/helius/types/response/digital-asset'
import type { HeliusResponse } from '@echo/helius/types/response/helius-response'
import type { SupportedCluster } from '@echo/helius/types/supported-cluster'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import axios, { type AxiosResponse } from 'axios'
import { path } from 'ramda'

export interface GetNftArgs {
  cluster: SupportedCluster
  address: string
}

export function getNft({ cluster, address }: GetNftArgs): Promise<DigitalAsset> {
  return axios
    .post<HeliusResponse<DigitalAsset>, AxiosResponse<HeliusResponse<DigitalAsset>>, GetNftRequest>(
      getHeliusApiUrl(cluster),
      {
        jsonrpc: JSON_RPC_VERSION,
        id: `${ApiMethods.GET_ASSET}-${address}`,
        method: ApiMethods.GET_ASSET,
        params: {
          id: address,
          displayOptions: {
            showCollectionMetadata: true
          }
        }
      },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then(nonNullableReturn(path(['data', 'result'])))
}
