import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreRequestForOfferActivity, FirestoreRequestForOfferActivityData } from '@echo/firestore'
import { toPromise } from '@echo/utils'

export const convertRequestForOfferActivity: FirestoreNestedDocumentConverter<
  FirestoreRequestForOfferActivity,
  FirestoreRequestForOfferActivityData
> = toPromise
