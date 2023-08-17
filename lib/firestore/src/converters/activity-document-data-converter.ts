import { numberPropToDate } from '../helpers/converters/from-firestore/number-prop-to-date'
import { datePropToNumber } from '../helpers/converters/to-firestore/date-prop-to-number'
import { removeUndefinedProps } from '../helpers/converters/to-firestore/remove-undefined-props'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { Activity } from '../types/model/activity'
import { ActivityDocumentData } from '../types/model/activity-document-data'
import { applySpec, pipe, prop } from 'ramda'

export const activityDocumentDataConverter: FirestoreDocumentDataConverter<ActivityDocumentData, Activity> = {
  fromFirestore: applySpec<Activity>({
    date: numberPropToDate('date'),
    fromState: prop('fromState'),
    toState: prop('toState')
  }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: pipe(removeUndefinedProps, datePropToNumber('date'))
}
