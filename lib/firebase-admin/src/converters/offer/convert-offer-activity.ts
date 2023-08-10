import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreOfferActivity, FirestoreOfferActivityData } from '@echo/firestore'
import { toPromise } from '@echo/utils'

export const convertOfferActivity: FirestoreNestedDocumentConverter<
  FirestoreOfferActivity,
  FirestoreOfferActivityData
> = toPromise
