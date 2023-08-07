import { convertContract } from '../../converters/contract/convert-contract'
import { getContractSnapshotByAddress } from './get-contract-snapshot-by-address'
import { FirestoreContractData } from '@echo/firestore'
import { QueryDocumentSnapshot } from '@google-cloud/firestore'
import { andThen, pipe } from 'ramda'

interface ContractQuery {
  address: string
  chainId: number
}

export const findContractByAddress = pipe<
  ContractQuery[],
  Promise<QueryDocumentSnapshot<FirestoreContractData>>,
  Promise<FirestoreContractData>
>(getContractSnapshotByAddress, andThen(convertContract))
