import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreRequestForOfferActivity } from '../../types/model/collections/request-for-offer/firestore-request-for-offer-activity'
import { FirestoreRequestForOfferActivityData } from '../../types/model/data/request-for-offer/firestore-request-for-offer-activity-data'
import { castAs, toPromise } from '@echo/utils'
import { pipe } from 'ramda'

export const convertRequestForOfferActivity: FirestoreNestedDocumentConverter<
  FirestoreRequestForOfferActivity,
  FirestoreRequestForOfferActivityData
> = pipe<
  [FirestoreRequestForOfferActivity],
  FirestoreRequestForOfferActivityData,
  Promise<FirestoreRequestForOfferActivityData>
>(castAs, toPromise)
