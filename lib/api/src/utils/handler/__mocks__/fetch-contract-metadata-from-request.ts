import { mockGetContractMetadata } from '../../../mocks/alchemy/get-contract-metadata'
import { GetContractMetadataResponse } from '@echo/alchemy'
import { TargetRequest } from '@echo/api-public'
import { idThrower } from '@echo/utils'

export const fetchContractMetadataFromRequest = async (target: TargetRequest): Promise<GetContractMetadataResponse> => {
  try {
    const result = await mockGetContractMetadata(target.address)
    idThrower(target.address)
    return Promise.resolve(result)
  } catch (_error) {
    return Promise.reject(new Error('fetchContractMetadataFromRequest error'))
  }
}
