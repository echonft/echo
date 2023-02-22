import { FirestoreOfferActivityData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToDate } from '../../utils/mapper/prop-to-date'
import { OfferActivity, OfferState } from '@echo/model'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { Dayjs } from 'dayjs'
import { andThen, juxt, pipe } from 'ramda'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const mapOfferActivity: FirestoreMapper<FirestoreOfferActivityData, OfferActivity> = andThen(
  pipe(
    juxt([
      propToPromise<string>('id'),
      propToDate<Dayjs>('date'),
      propToPromise<OfferState | undefined>('fromState'),
      propToPromise<OfferState>('toState')
    ]),
    (promises) => Promise.all(promises),
    zipPromisesToObject<OfferActivity>(['id', 'date', 'fromState', 'toState'])
  )
)
