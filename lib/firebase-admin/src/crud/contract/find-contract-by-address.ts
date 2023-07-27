import { convertContract } from '../../converters/contract/convert-contract'
import { getContractSnapshotByAddress } from './get-contract-snapshot-by-address'
import { FirestoreContractData } from '@echo/firestore'
import { andThenOtherwise, toErrorPromise } from '@echo/utils'
import { QueryDocumentSnapshot } from '@google-cloud/firestore'
import { R } from '@mobily/ts-belt'
import { pipe } from 'ramda'

interface ContractQuery {
  address: string
  chainId: number
}

export const findContractByAddress = pipe<
  ContractQuery[],
  Promise<QueryDocumentSnapshot<FirestoreContractData>>,
  Promise<R.Result<FirestoreContractData, Error>>
>(
  getContractSnapshotByAddress,
  andThenOtherwise(
    pipe(convertContract, R.fromPromise),
    pipe(toErrorPromise<FirestoreContractData>, R.fromPromise<FirestoreContractData>)
  )
)
