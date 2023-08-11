import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreRequestForOfferActivityData } from '../../types/model/data/request-for-offer/firestore-request-for-offer-activity-data'
import { propToDate } from '../../utils/mappers/prop-to-date'
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
