import { FirestoreSwapActivityData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToDate } from '../../utils/mapper/prop-to-date'
import { SwapActivity, SwapState } from '@echo/model'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { Dayjs } from 'dayjs'
import { andThen, juxt, pipe } from 'ramda'

export const mapSwapActivity: FirestoreMapper<FirestoreSwapActivityData, SwapActivity> = andThen(
  pipe(
    juxt([
      propToDate<Dayjs>('date'),
      propToPromise<SwapState | undefined>('fromState'),
      propToPromise<SwapState>('toState')
    ]),
    (promises) => Promise.all(promises),
    zipPromisesToObject<SwapActivity>(['date', 'fromState', 'toState'])
  )
)
