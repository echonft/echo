import { FirestoreRequestForOfferActivityData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToDate } from '../../utils/mapper/prop-to-date'
import { OfferState, RequestForOfferActivity } from '@echo/model'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { Dayjs } from 'dayjs'
import { andThen, juxt, pipe } from 'ramda'

export const mapRequestForOfferActivity: FirestoreMapper<
  FirestoreRequestForOfferActivityData,
  RequestForOfferActivity
> = andThen(
  pipe(
    juxt([
      propToPromise<string>('id'),
      propToDate<Dayjs>('date'),
      propToPromise<OfferState | undefined>('fromState'),
      propToPromise<OfferState>('toState')
    ]),
    (promises) => Promise.all(promises),
    zipPromisesToObject<RequestForOfferActivity>(['id', 'date', 'fromState', 'toState'])
  )
)
