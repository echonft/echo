import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreOfferActivityData } from '../../types/model/data/offer/firestore-offer-activity-data'
import { propToDate } from '../../utils/mapper/prop-to-date'
import { OfferActivity } from '@echo/model'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, pipe } from 'ramda'

export const mapOfferActivity: FirestoreMapper<FirestoreOfferActivityData, OfferActivity> = andThen(
  pipe(
    juxt([propToDate('date'), propToPromise('fromState'), propToPromise('toState')]),
    promiseAll,
    zipPromisesToObject<OfferActivity>(['date', 'fromState', 'toState'])
  )
)
