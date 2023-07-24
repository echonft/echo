import { getContractMetadata, GetContractMetadataResponse } from '../../../../alchemy'
import { TargetRequest } from '../../types'
import { findContractByAddressAndChainId } from '@echo/firebase-admin'
import { R } from '@mobily/ts-belt'

export const fetchContractMetadataFromRequest = async (target: TargetRequest): Promise<GetContractMetadataResponse> => {
  const contractResult = await findContractByAddressAndChainId(target)
  if (R.isOk(contractResult)) {
    return Promise.reject(new Error('Contract already exist'))
  }
  return getContractMetadata(target.address).then((contractMetadataResult) => {
    if (R.isError(contractMetadataResult)) {
      throw new Error('Error fetching contract metadata')
    }
    return R.getExn(contractMetadataResult)
  })
}
