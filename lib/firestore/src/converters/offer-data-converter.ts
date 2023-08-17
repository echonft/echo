import { getSnapshotData } from '../helpers/converters/get-snapshot-data'
import { Offer } from '../types/model/offer'
import { OfferDocumentData } from '../types/model/offer-document-data'
import { offerDocumentDataConverter } from './offer-document-data-converter'
import {
  FirestoreDataConverter,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  SetOptions,
  WithFieldValue
} from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const offerDataConverter: FirestoreDataConverter<Offer> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<OfferDocumentData>): Offer {
    return pipe(getSnapshotData<OfferDocumentData>, offerDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(
    modelObject: PartialWithFieldValue<Offer> | WithFieldValue<Offer>,
    _options?: SetOptions
  ): OfferDocumentData {
    return offerDocumentDataConverter.toFirestore(modelObject)
  }
}
