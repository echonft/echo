import { FirestoreRequestForOfferActivity, FirestoreRequestForOfferActivityData } from '../../types'
import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
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
