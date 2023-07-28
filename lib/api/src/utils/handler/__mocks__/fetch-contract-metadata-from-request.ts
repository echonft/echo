import { mockGetContractMetadata } from '../../../mocks/alchemy/get-contract-metadata'
import { GetContractMetadataResponse } from '@echo/alchemy'
import { TargetRequest } from '@echo/api-public'
import { idThrower } from '@echo/utils'
import { R } from '@mobily/ts-belt'

export const fetchContractMetadataFromRequest = async (target: TargetRequest): Promise<GetContractMetadataResponse> => {
  const result = await mockGetContractMetadata(target.address)
  idThrower(target.address)
  return R.isError(result)
    ? Promise.reject(new Error('fetchContractMetadataFromRequest error'))
    : Promise.resolve(R.getExn(result))
}
