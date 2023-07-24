import { GetContractMetadataResponse } from '../../../../../alchemy'
import { idThrower } from '../../../../../utils/src/test/id-thrower'
import { TargetRequest } from '../../../types'
import { mockGetContractMetadata } from '../../test/mocks/alchemy/get-contract-metadata'
import { R } from '@mobily/ts-belt'

export const fetchContractMetadataFromRequest = async (target: TargetRequest): Promise<GetContractMetadataResponse> => {
  const result = await mockGetContractMetadata(target.address)
  idThrower(target.address)
  return R.isError(result)
    ? Promise.reject(new Error('fetchContractMetadataFromRequest error'))
    : Promise.resolve(R.getExn(result))
}
