import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreOfferActivity } from '../../types/model/collections/offer/firestore-offer-activity'
import { FirestoreOfferActivityData } from '../../types/model/data/offer/firestore-offer-activity-data'
import { toPromise } from '@echo/utils'

export const convertOfferActivity: FirestoreNestedDocumentConverter<
  FirestoreOfferActivity,
  FirestoreOfferActivityData
> = toPromise
