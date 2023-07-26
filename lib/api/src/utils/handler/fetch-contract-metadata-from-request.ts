import { TargetRequest } from '../../types'
import { getContractMetadata, GetContractMetadataResponse } from '@echo/alchemy'
import { findContractByAddressAndChainId } from '@echo/firebase-admin'
import { R } from '@mobily/ts-belt'

export const fetchContractMetadataFromRequest = (target: TargetRequest): Promise<GetContractMetadataResponse> =>
  findContractByAddressAndChainId(target).then((contractResult) => {
    if (R.isOk(contractResult)) {
      return Promise.reject(new Error('Contract already exist'))
    }
    return getContractMetadata(target.address).then((contractMetadataResult) => {
      if (R.isError(contractMetadataResult)) {
        throw new Error('Error fetching contract metadata')
      }
      return R.getExn(contractMetadataResult)
    })
  })
