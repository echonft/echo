import { TargetRequest } from '@echo/api-public'
import { contractFirestoreData } from '@echo/firestore'
import { isNil } from 'ramda'

export const mockFindContractByAddress = (target: TargetRequest) => {
  const contractData = contractFirestoreData[target.address]
  if (isNil(contractData)) {
    return Promise.reject('not found')
  }
  return Promise.resolve(contractData)
}
