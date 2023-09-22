import { offerPostDocumentDataConverter } from '@echo/firestore/converters/offer-post/offer-post-document-data-converter'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreModel } from '@echo/firestore/types/abstract/firestore-model'
import type { FirestoreOfferPost } from '@echo/firestore/types/model/offer-post/firestore-offer-post'
import type { OfferPostDocumentData } from '@echo/firestore/types/model/offer-post/offer-post-document-data'
import type { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const offerPostDataConverter: FirestoreDataConverter<Partial<FirestoreOfferPost>> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<OfferPostDocumentData>) {
    return pipe(getSnapshotData<OfferPostDocumentData>, offerPostDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<FirestoreOfferPost>, _options?: SetOptions): OfferPostDocumentData {
    return offerPostDocumentDataConverter.toFirestore(modelObject)
  }
}
