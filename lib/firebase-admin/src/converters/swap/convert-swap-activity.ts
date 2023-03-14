import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreSwapActivity, FirestoreSwapActivityData } from '@echo/firestore'
import { castAs, toPromise } from '@echo/utils'
import { pipe } from 'ramda'

export const convertSwapActivity: FirestoreNestedDocumentConverter<FirestoreSwapActivity, FirestoreSwapActivityData> =
  pipe<[FirestoreSwapActivity], FirestoreSwapActivityData, Promise<FirestoreSwapActivityData>>(castAs, toPromise)
