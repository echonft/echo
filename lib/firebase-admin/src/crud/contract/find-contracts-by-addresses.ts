import { findContractByAddress } from './find-contract-by-address'
import { FirestoreContractData } from '@echo/firestore'
import { errorPromise, promiseAll } from '@echo/utils'
import { ifElse, isEmpty, map, pipe } from 'ramda'

interface ContractQuery {
  address: string
  chainId: number
}
export const findContractsByAddresses = (queries: ContractQuery[]): Promise<FirestoreContractData[]> =>
  ifElse(
    isEmpty,
    errorPromise<FirestoreContractData[]>('findContractsByAddresses no contracts sent'),
    pipe(map(findContractByAddress), promiseAll)
  )(queries)
