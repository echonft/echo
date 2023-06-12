import { idThrower } from '../../../../../../utils/src/test/id-thrower'
import { mockGetNftsForContractResponse } from './get-nfts-for-contract-response'
import { GetNftResponse } from '@echo/alchemy-v3'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'

export const mockGetNftsForContract = (contractAddress: string) => {
  const response = mockGetNftsForContractResponse[contractAddress]
  idThrower(contractAddress)
  return R.fromPromise<GetNftResponse[]>(
    isNil(response) ? Promise.reject(new Error('not found')) : Promise.resolve(response)
  )
}
