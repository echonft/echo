import { FirestoreMapper } from '../../types/mappers/firestore-mapper'
import { propToDate } from '../base/prop-to-date'
import { FirestoreActivityData } from '@echo/firestore'
import { RequestForOfferActivity } from '@echo/ui'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, pipe } from 'ramda'

export const mapRequestForOfferActivity: FirestoreMapper<FirestoreActivityData, RequestForOfferActivity> = andThen(
  pipe(
    juxt([propToDate('date'), propToPromise('fromState'), propToPromise('toState')]),
    promiseAll,
    zipPromisesToObject<RequestForOfferActivity>(['date', 'fromState', 'toState'])
  )
)
