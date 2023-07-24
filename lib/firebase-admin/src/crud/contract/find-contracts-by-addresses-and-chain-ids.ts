/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ContractQuery } from '../../types/query/contract-query'
import { findContractByAddressAndChainId } from './find-contract-by-address-and-chain-id'
import { FirestoreContractData } from '@echo/firestore'
import { errorPromise, promiseAll, toPromise } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, any, ifElse, isEmpty, map, pipe } from 'ramda'

// FIXME Typing is wrong here
export const findContractsByAddressesAndChainIds = (
  queries: ContractQuery[]
): Promise<R.Result<FirestoreContractData[], Error>> =>
  // @ts-ignore
  ifElse(
    isEmpty,
    pipe(
      errorPromise<FirestoreContractData[]>('findContractsByAddressesAndChainIds no contracts sent'),
      R.fromPromise<FirestoreContractData[]>
    ),
    pipe(
      map(findContractByAddressAndChainId),
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
