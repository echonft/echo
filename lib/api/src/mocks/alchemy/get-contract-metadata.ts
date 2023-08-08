import { mockGetContractMetadataResponse } from './get-contract-metadata-response'
import { idThrower } from '@echo/utils'
import { isNil } from 'ramda'

export const mockGetContractMetadata = (contractAddress: string) => {
  const response = mockGetContractMetadataResponse[contractAddress]
  idThrower(contractAddress)
  if (isNil(response)) {
    return Promise.reject('not found')
  }
  return Promise.resolve(response)
}
