import { convertContract } from '../../converters/contract/convert-contract'
import { FirestoreContractData } from '../../types/model/data/contract/firestore-contract-data'
import { getContractSnapshotByAddress } from './get-contract-snapshot-by-address'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
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
