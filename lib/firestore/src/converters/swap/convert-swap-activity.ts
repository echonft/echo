import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreSwapActivity } from '../../types/model/collections/swap/firestore-swap-activity'
import { FirestoreSwapActivityData } from '../../types/model/data/swap/firestore-swap-activity-data'
import { castAs, toPromise } from '@echo/utils'
import { pipe } from 'ramda'

export const convertSwapActivity: FirestoreNestedDocumentConverter<FirestoreSwapActivity, FirestoreSwapActivityData> =
  pipe<[FirestoreSwapActivity], FirestoreSwapActivityData, Promise<FirestoreSwapActivityData>>(castAs, toPromise)
