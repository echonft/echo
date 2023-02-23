import { FirestoreRequestForOfferActivityData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToDate } from '../../utils/mapper/prop-to-date'
import { RequestForOfferActivity, RequestForOfferState } from '@echo/model'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { Dayjs } from 'dayjs'
import { andThen, juxt, pipe } from 'ramda'

export const mapRequestForOfferActivity: FirestoreMapper<
  FirestoreRequestForOfferActivityData,
  RequestForOfferActivity
> = andThen(
  pipe(
    juxt([
      propToDate<Dayjs>('date'),
      propToPromise<RequestForOfferState | undefined>('fromState'),
      propToPromise<RequestForOfferState>('toState')
    ]),
    (promises) => Promise.all(promises),
    zipPromisesToObject<RequestForOfferActivity>(['date', 'fromState', 'toState'])
  )
)
