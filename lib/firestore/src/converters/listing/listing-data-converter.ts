import { listingDocumentDataConverter } from '@echo/firestore/converters/listing/listing-document-data-converter'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreModel } from '@echo/firestore/types/abstract/firestore-model'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import type { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const listingDataConverter: FirestoreDataConverter<Partial<FirestoreListing>> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<ListingDocumentData>) {
    return pipe(getSnapshotData<ListingDocumentData>, listingDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<FirestoreListing>, _options?: SetOptions): ListingDocumentData {
    return listingDocumentDataConverter.toFirestore(modelObject)
  }
}
