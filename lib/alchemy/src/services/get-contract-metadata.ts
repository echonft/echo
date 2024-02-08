import { AlchemyRoutes } from '@echo/alchemy/constants/alchemy-routes'
import { getAlchemyRoute } from '@echo/alchemy/helpers/get-alchemy-route'
import { mapContractResponse } from '@echo/alchemy/mappers/map-contract-response'
import type { GetContractMetadataRequest } from '@echo/alchemy/types/request/get-contract-metadata-request'
import type { ContractResponse } from '@echo/alchemy/types/response/contract-response'
import axios, { type AxiosResponse } from 'axios'
import { pipe, prop } from 'ramda'

export function getContractMetadata(chainId: number, address: string, verified?: boolean) {
  return axios
    .get<ContractResponse, AxiosResponse<ContractResponse>, GetContractMetadataRequest>(
      getAlchemyRoute(AlchemyRoutes.GET_CONTRACT_METADATA, chainId),
      {
        params: { contractAddress: address }
      }
    )
    .then(pipe(prop('data'), mapContractResponse(chainId, verified)))
}
