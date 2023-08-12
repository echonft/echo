import { SwapActivity } from '../../../../ui-model'
import { FirestoreMapper } from '../../types/mappers/firestore-mapper'
import { propToDate } from '../base/prop-to-date'
import { FirestoreActivityData } from '@echo/firestore'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, pipe } from 'ramda'

export const mapSwapActivity: FirestoreMapper<FirestoreActivityData, SwapActivity> = andThen(
  pipe(
    juxt([propToDate('date'), propToPromise('fromState'), propToPromise('toState')]),
    promiseAll,
    zipPromisesToObject<SwapActivity>(['date', 'fromState', 'toState'])
  )
)
