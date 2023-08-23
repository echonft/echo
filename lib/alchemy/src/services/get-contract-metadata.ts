import { getRoute } from '../constants/get-route'
import { AlchemyV3Routes } from '../constants/routes'
import { mapContractMetadata } from '../mappers/map-contract-metadata'
import { GetContractMetadataRequest } from '../types/request/get-contract-metadata-request'
import { ContractResponse } from '../types/response/contract-response'
import { GetContractMetadataResponse } from '../types/response/get-contract-metadata-response'
import { getData } from '@echo/utils'
import { andThen, pipe } from 'ramda'

export const getContractMetadata = (contractAddress: string): Promise<GetContractMetadataResponse> =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  pipe(getData<ContractResponse, GetContractMetadataRequest>, andThen(mapContractMetadata))(
    getRoute(AlchemyV3Routes.GET_CONTRACT_METADATA),
    { contractAddress }
  )
