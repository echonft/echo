import { mockGetNftsForContractResponse } from './get-nfts-for-contract-response'
import { idThrower } from '@echo/utils'
import { isNil } from 'ramda'

export const mockGetNftsForContract = (contractAddress: string) => {
  const response = mockGetNftsForContractResponse[contractAddress]
  idThrower(contractAddress)
  if (isNil(response)) {
    return Promise.reject('not found')
  }
  return Promise.resolve(response)
}
