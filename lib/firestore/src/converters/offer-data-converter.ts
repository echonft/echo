import { getSnapshotData } from '../helpers/converters/from-firestore/get-snapshot-data'
import { FirestoreModel } from '../types/abstract/firestore-model'
import { Offer } from '../types/model/offer'
import { OfferDocumentData } from '../types/model/offer-document-data'
import { offerDocumentDataConverter } from './offer-document-data-converter'
import { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export const offerDataConverter: FirestoreDataConverter<Offer> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<OfferDocumentData>): Offer {
    return pipe(getSnapshotData<OfferDocumentData>, offerDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<Offer>, _options?: SetOptions): OfferDocumentData {
    return offerDocumentDataConverter.toFirestore(modelObject)
  }
}
