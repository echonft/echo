import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreSwapActivity, FirestoreSwapActivityData } from '@echo/firestore'
import { toPromise } from '@echo/utils'

export const convertSwapActivity: FirestoreNestedDocumentConverter<FirestoreSwapActivity, FirestoreSwapActivityData> =
  toPromise
