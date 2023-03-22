import { FirestoreRequestForOfferActivityData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToDate } from '../../utils/mapper/prop-to-date'
import { RequestForOfferActivity } from '@echo/model'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, pipe } from 'ramda'

export const mapRequestForOfferActivity: FirestoreMapper<
  FirestoreRequestForOfferActivityData,
  RequestForOfferActivity
> = andThen(
  pipe(
    juxt([propToDate('date'), propToPromise('fromState'), propToPromise('toState')]),
    promiseAll,
    zipPromisesToObject<RequestForOfferActivity>(['date', 'fromState', 'toState'])
  )
)
