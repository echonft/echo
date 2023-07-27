/* eslint-disable @typescript-eslint/ban-ts-comment */
import { findContractByAddress } from './find-contract-by-address'
import { FirestoreContractData } from '@echo/firestore'
import { errorPromise, promiseAll, toPromise } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, any, ifElse, isEmpty, map, pipe } from 'ramda'

interface ContractQuery {
  address: string
  chainId: number
}
export const findContractsByAddresses = (queries: ContractQuery[]): Promise<R.Result<FirestoreContractData[], Error>> =>
  // @ts-ignore
  ifElse(
    isEmpty,
    pipe(
      errorPromise<FirestoreContractData[]>('findContractsByAddressesAndChainIds no contracts sent'),
      R.fromPromise<FirestoreContractData[]>
    ),
    pipe(
      map(findContractByAddress),
      // @ts-ignore
      promiseAll,
      andThen(
        // @ts-ignore
        ifElse(
          // @ts-ignore
          any(R.isError),
          pipe(
            errorPromise<FirestoreContractData[]>('findContractsByAddressesAndChainIds not found'),
            R.fromPromise<FirestoreContractData[]>
          ),
          // @ts-ignore
          pipe(map(R.getExn), toPromise, R.fromPromise)
        )
      )
    )
  )(queries)
