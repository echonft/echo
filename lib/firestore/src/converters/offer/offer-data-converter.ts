import { offerDocumentDataConverter } from '@echo/firestore/converters/offer/offer-document-data-converter'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import type { FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { PartialWithFieldValue } from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const offerDataConverter: FirestoreDataConverter<FirestoreOffer> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<OfferDocumentData>) {
    return pipe(getSnapshotData<OfferDocumentData>, offerDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(modelObject: PartialWithFieldValue<FirestoreOffer>): OfferDocumentData {
    return offerDocumentDataConverter.toFirestore(modelObject)
  }
}
