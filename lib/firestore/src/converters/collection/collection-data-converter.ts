import { lowerContractAddress } from '@echo/firestore/helpers/converters/collection/lower-contract-address'
import { lowerContractAddressIfExists } from '@echo/firestore/helpers/converters/collection/to-firestore/lower-contract-address-if-exists'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { Collection } from '@echo/model/types/collection'
import { type FirestoreDataConverter, QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export const collectionDataConverter: FirestoreDataConverter<Collection> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<Collection>) {
    return pipe(getSnapshotData<Collection>, lowerContractAddress)(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Collection>): WithFieldValue<Collection> {
    return lowerContractAddressIfExists(modelObject)
  }
}
