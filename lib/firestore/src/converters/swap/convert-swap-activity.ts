import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreSwapActivity } from '../../types/model/collections/swap/firestore-swap-activity'
import { FirestoreSwapActivityData } from '../../types/model/data/swap/firestore-swap-activity-data'
import { toPromise } from '@echo/utils'

export const convertSwapActivity: FirestoreNestedDocumentConverter<FirestoreSwapActivity, FirestoreSwapActivityData> =
  toPromise
