import { mockGetContractMetadataResponse } from './get-contract-metadata-response'
import { idThrower } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'

export const mockGetContractMetadata = (contractAddress: string) => {
  const response = mockGetContractMetadataResponse[contractAddress]
  idThrower(contractAddress)
  return R.fromPromise(isNil(response) ? Promise.reject(new Error('not found')) : Promise.resolve(response))
}
