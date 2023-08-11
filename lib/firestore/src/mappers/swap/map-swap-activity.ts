import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreSwapActivityData } from '../../types/model/data/swap/firestore-swap-activity-data'
import { propToDate } from '../../utils/mappers/prop-to-date'
import { SwapActivity } from '@echo/model'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, pipe } from 'ramda'

export const mapSwapActivity: FirestoreMapper<FirestoreSwapActivityData, SwapActivity> = andThen(
  pipe(
    juxt([propToDate('date'), propToPromise('fromState'), propToPromise('toState')]),
    promiseAll,
    zipPromisesToObject<SwapActivity>(['date', 'fromState', 'toState'])
  )
)
