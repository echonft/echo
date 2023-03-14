import { FirestoreOfferActivityData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToDate } from '../../utils/mapper/prop-to-date'
import { OfferActivity, OfferState } from '@echo/model'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { Dayjs } from 'dayjs'
import { andThen, juxt, pipe } from 'ramda'

export const mapOfferActivity: FirestoreMapper<FirestoreOfferActivityData, OfferActivity> = andThen(
  pipe(
    juxt([
      propToDate<Dayjs>('date'),
      propToPromise<OfferState | undefined>('fromState'),
      propToPromise<OfferState>('toState')
    ]),
    (promises) => Promise.all(promises),
    zipPromisesToObject<OfferActivity>(['date', 'fromState', 'toState'])
  )
)
