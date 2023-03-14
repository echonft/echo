import { FirestoreOfferActivity, FirestoreOfferActivityData } from '../../types'
import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { castAs, toPromise } from '@echo/utils'
import { pipe } from 'ramda'

export const convertOfferActivity: FirestoreNestedDocumentConverter<
  FirestoreOfferActivity,
  FirestoreOfferActivityData
> = pipe<[FirestoreOfferActivity], FirestoreOfferActivityData, Promise<FirestoreOfferActivityData>>(castAs, toPromise)
