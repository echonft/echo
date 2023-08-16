import { getSnapshotIdAndData } from '../helpers/converters/get-snapshot-id-and-data'
import { Contract } from '../types/model/converted/contract'
import { ContractDocumentData } from '../types/model/document-data/contract-document-data'
import {
  FirestoreDataConverter,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  SetOptions,
  WithFieldValue
} from 'firebase-admin/firestore'
import { applySpec, path, pipe, prop, toLower } from 'ramda'

export const contractConverter: FirestoreDataConverter<Contract> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<ContractDocumentData>): Contract {
    return pipe(
      getSnapshotIdAndData,
      applySpec<Contract>({
        id: prop('id'),
        address: path(['data', 'address']),
        chainId: path(['data', 'chainId']),
        name: path(['data', 'name']),
        symbol: path(['data', 'symbol']),
        tokenType: path(['data', 'tokenType'])
      })
    )(snapshot)
  },
  toFirestore(
    modelObject: PartialWithFieldValue<Contract> | WithFieldValue<Contract>,
    _options?: SetOptions
  ): ContractDocumentData {
    return applySpec<ContractDocumentData>({
      address: prop('address'),
      addressLowercase: pipe(prop('address'), toLower),
      chainId: prop('chainId'),
      name: prop('name'),
      symbol: prop('symbol'),
      tokenType: prop('tokenType')
    })(modelObject)
  }
}
