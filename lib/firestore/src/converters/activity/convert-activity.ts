import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreActivity } from '../../types/model/collections/activity/firestore-activity'
import { FirestoreActivityData } from '../../types/model/data/activity/firestore-activity-data'
import { toPromise } from '@echo/utils'

export const convertActivity: FirestoreNestedDocumentConverter<FirestoreActivity, FirestoreActivityData> = toPromise
