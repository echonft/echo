import { TargetRequest } from '../../../../types'
import { contractFirestoreData, FirestoreContractData } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'

export const mockFindContractByAddressAndChainId = (target: TargetRequest) => {
  const contractData = contractFirestoreData[target.address]
  return R.fromPromise<FirestoreContractData>(
    isNil(contractData) ? Promise.reject(new Error('not found')) : Promise.resolve(contractData)
  )
}
