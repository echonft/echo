import { datePropToNumber } from '../helpers/converters/date-prop-to-number'
import { numberPropToDate } from '../helpers/converters/number-prop-to-date'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { Activity } from '../types/model/activity'
import { ActivityDocumentData } from '../types/model/activity-document-data'

export const activityDocumentDataConverter: FirestoreDocumentDataConverter<ActivityDocumentData, Activity> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: numberPropToDate('date'),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: datePropToNumber('date')
}
