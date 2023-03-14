import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreRequestForOfferActivity, FirestoreRequestForOfferActivityData } from '@echo/firestore'
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
