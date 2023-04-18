import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreOfferActivity } from '../../types/model/collections/offer/firestore-offer-activity'
import { FirestoreOfferActivityData } from '../../types/model/data/offer/firestore-offer-activity-data'
import { castAs, toPromise } from '@echo/utils'
import { pipe } from 'ramda'

export const convertOfferActivity: FirestoreNestedDocumentConverter<
  FirestoreOfferActivity,
  FirestoreOfferActivityData
> = pipe<[FirestoreOfferActivity], FirestoreOfferActivityData, Promise<FirestoreOfferActivityData>>(castAs, toPromise)
