import { idThrower } from '../../../../../../utils/src/test/id-thrower'
import { mockGetContractMetadataResponse } from './get-contract-metadata-response'
import { GetContractMetadataResponse } from '@echo/alchemy-v3'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'

export const mockGetContractMetadata = (contractAddress: string) => {
  const response = mockGetContractMetadataResponse[contractAddress]
  idThrower(contractAddress)
  return R.fromPromise<GetContractMetadataResponse>(
    isNil(response) ? Promise.reject(new Error('not found')) : Promise.resolve(response)
  )
}
