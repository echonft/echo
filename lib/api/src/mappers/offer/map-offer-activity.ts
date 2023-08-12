import { OfferActivity } from '../../../../ui-model'
import { FirestoreMapper } from '../../types/mappers/firestore-mapper'
import { propToDate } from '../base/prop-to-date'
import { FirestoreActivityData } from '@echo/firestore'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, pipe } from 'ramda'

export const mapOfferActivity: FirestoreMapper<FirestoreActivityData, OfferActivity> = andThen(
  pipe(
    juxt([propToDate('date'), propToPromise('fromState'), propToPromise('toState')]),
    promiseAll,
    zipPromisesToObject<OfferActivity>(['date', 'fromState', 'toState'])
  )
)
